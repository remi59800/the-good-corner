import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { CategoryType } from './Category';
import axios from 'axios';
import { API_URL } from '@/config';
import { useRouter } from 'next/router';
import { AdType } from './AdCard';

type AdFormData = Omit<AdType, 'id'>;

type AdFormProps = {
  ad?: AdType;
};

export const AdForm = ({ ad }: AdFormProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<'title' | 'price'>();

  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState<null | number>(null);

  // fetch des categories pour la liste déroulante
  const fetchCategories = async () => {
    try {
      const result = await axios.get<CategoryType[]>(API_URL + '/categories');
      setCategories(result.data);
    } catch (err) {
      console.log(err, 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const router = useRouter();

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
        const result = await axios.post(`${API_URL}/ads`, data);
        if ('id' in result.data) {
          setTitle('');
          setOwner('');
          setDescription('');
          setPrice(0);
          setPicture('');
          setPicture('');
          setCategoryId(null);

          // data.reset();

          toast.success('🚀 Offre publiée !', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          setTimeout(() => {
            router.replace(API_URL);
          }, 3700);
        } else {
          toast.error('🦄 Wow so easy!', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        const result = await axios.patch(`${API_URL}/ads${ad.id}`, data);
        setTimeout(() => {
          router.replace(`/ads/${ad.id}`);
        }, 3700);
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
      setCategoryId(ad?.category ? ad.category.id : null);
    }
  }, [ad]);

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
        <button type='submit' className='button-submit'>
          {ad ? "Modifier l'offre" : "Publier l'offre"}
        </button>
      </form>
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
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
