import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '@/config';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { queryAllCategories } from '@/graphql/queryAllCategories';
import { mutationCreateAd } from '@/graphql/mutationCreateAd';
import { queryAllAds } from '@/graphql/queryAllAds';
import { mutationUpdateAd } from '@/graphql/mutationUpdateAd';
import { queryAd } from '@/graphql/queryAd';
import { AdType, CategoryType } from '@/types';

type AdFormData = {
  title: string;
  owner: string;
  description: string;
  price: number;
  picture: string;
  location: string;
  category: { id: number } | null;
};

type AdFormProps = {
  ad?: AdType;
};

export const AdForm = ({ ad }: AdFormProps) => {
  // fetch des categories pour la liste déroulante
  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useQuery<{ items: CategoryType[] }>(queryAllCategories);
  const categories = categoriesData ? categoriesData.items : [];

  // fetch des tags
  // const {
  //   data: tagsData,
  //   error: tagsError,
  //   loading: tagsLoading,
  // } = useQuery<{ items: CategoryType[] }>(queryAllCategories);
  // const tags = tagsData ? tagsData.items : [];

  const [error, setError] = useState<'title' | 'price'>();
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState<null | number>(null);

  const router = useRouter();

  const [doCreate, { loading: createLoading }] = useMutation(mutationCreateAd, {
    refetchQueries: [queryAllAds],
  });
  const [doUpdate, { loading: updateLoading }] = useMutation(mutationUpdateAd, {
    refetchQueries: [queryAd, queryAllAds],
  });

  const loading = createLoading || updateLoading;

  // Soumission du formulaire avec envoi de la data à l'API avec le post ou le patch
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);

    const data: AdFormData = {
      title,
      owner,
      description,
      price,
      picture,
      location,
      category: categoryId ? { id: Number(categoryId) } : null,
    };

    if (data.title.trim().length < 3) {
      setError('title');
    } else if (data.price < 0) {
      setError('price');
    } else {
      if (!ad) {
        const result = await doCreate({
          variables: {
            data: data,
          },
        });
        if ('id' in result.data.item) {
          setTitle('');
          setOwner('');
          setDescription('');
          setPrice(0);
          setPicture('');
          setLocation('');
          setCategoryId(null);

          toast.success('🚀 Offre publiée !', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          setTimeout(() => {
            router.replace(`${URL}/ads/${result.data.item.id}`);
          }, 3700);
        } else {
          toast.error("L'offre n'a pas été publiée", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        const result = await doUpdate({
          variables: {
            id: ad?.id,
            data: data,
          },
        });
        if (!result.errors?.length) {
          router.replace(`/ads/${ad.id}`);
        }
      }
    }
  };

  useEffect(() => {
    if (ad) {
      setTitle(ad.title);
      setOwner(ad.owner);
      setDescription(ad.description);
      setPrice(ad.price);
      setPicture(ad.picture);
      setLocation(ad.location);
      setCategoryId(ad?.category ? ad.category.id : categories[0]?.id);
    } else if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [ad, categories]);

  return (
    <>
      <form onSubmit={submitForm}>
        <input
          type='text'
          className='text-field'
          value={title}
          name='title'
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l'annonce"
        ></input>
        <br></br>
        <br></br>
        <input
          type='text'
          className='text-field'
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          name='owner'
          placeholder='Votre e-mail'
        ></input>
        <br></br>
        <br></br>
        <textarea
          className='text-area'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
        ></textarea>
        <br></br>
        <br></br>
        <input
          type='number'
          className='text-field'
          name='price'
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder='0,00€'
        ></input>
        <br></br>
        <br></br>
        <input
          type='text'
          className='text-field'
          name='picture'
          onChange={(e) => setPicture(e.target.value)}
          value={picture}
          placeholder="URL de l'image"
        ></input>
        <br></br>
        <br></br>
        <input
          type='text'
          className='text-field'
          name='location'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder='Où se situe votre bien ?'
        ></input>
        <br></br>
        <br></br>
        <select
          name='categoryId'
          className='select'
          value={categoryId + ''}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br></br>
        <br></br>
        <button type='submit' disabled={loading} className='button-submit'>
          {ad ? "Modifier l'offre" : "Publier l'offre"}
        </button>
      </form>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
};
