import { CategoryProps } from '@/components/Category';
import { Layout } from '@/components/Layout';
import { APP_URL } from '@/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type AdFormData = {
  title: string;
  owner: string;
  description: string;
  price: number;
  picture: string;
  location: string;
  createdAt: Date;
  category: { id: number };
};

export default function NewAd() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const fetchCategories = async () => {
    try {
      const result = await axios.get<CategoryProps[]>(APP_URL + '/categories');
      setCategories(result.data);
    } catch (err) {
      console.log(err, 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form as HTMLFormElement);

    const data: AdFormData = Object.fromEntries(
      formData.entries()
    ) as unknown as AdFormData;

    if ('categoryId' in data) {
      data.category = { id: Number(data.categoryId) };
      delete data.categoryId;
    }

    console.log('avant post', data);
    axios.post(APP_URL + '/ads', data);
  };

  return (
    <Layout title='Ad'>
      <main className='main-content'>
        <form onSubmit={submitForm}>
          <input
            type='text'
            className='text-field'
            name='title'
            placeholder="Titre de l'annonce"
          ></input>
          <br></br>
          <br></br>
          <input
            type='text'
            className='text-field'
            name='owner'
            placeholder='Votre e-mail'
          ></input>
          <br></br>
          <br></br>
          <textarea
            className='text-area'
            name='description'
            placeholder='Description'
          ></textarea>
          <br></br>
          <br></br>
          <input
            type='number'
            className='text-field'
            name='price'
            placeholder='0,00€'
          ></input>
          <br></br>
          <br></br>
          <input
            type='text'
            className='text-field'
            name='picture'
            placeholder="URL de l'image"
          ></input>
          <br></br>
          <br></br>
          <input
            type='text'
            className='text-field'
            name='location'
            placeholder='Où se situe votre bien ?'
          ></input>
          <br></br>
          <br></br>
          <select name='categoryId' className='select'>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <br></br>
          <br></br>
          <button type='submit' className='button-submit'>
            Submit
          </button>
        </form>
      </main>
    </Layout>
  );
}
