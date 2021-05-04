import React, { ReactElement } from 'react';
import ReviewItem from './ReviewItem';
import { subDays } from 'date-fns';
import { IReview } from '../../types';

const data: { results: IReview[] } = {
  results: [
    {
      id: '0',
      name: 'Fer Black',
      rating: 3,
      review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, temporibus voluptatibus! Odio expedita totam enim. Repellat doloribus ea neque perspiciatis. Tempore iusto doloremque dolor natus rem facilis commodi quia pariatur.`,
      date: subDays(new Date(), 3),
      response: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, ipsa quibusdam similique maiores error minus voluptates sequi assumenda dolorum tempora ad earum eligendi voluptas iusto tenetur, quas aspernatur accusantium temporibus.`,
      response_date: subDays(new Date(), 2),
    },
    {
      id: '10',
      name: 'Jack Daniels',
      rating: 5,
      review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, temporibus voluptatibus! Odio expedita totam enim. Repellat doloribus ea neque perspiciatis. Tempore iusto doloremque dolor natus rem facilis commodi quia pariatur.`,
      date: subDays(new Date(), 3),
      response: null,
      response_date: null,
    },
    {
      id: '20',
      name: 'Jenny White',
      rating: 1,
      review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, temporibus voluptatibus! Odio expedita totam enim. Repellat doloribus ea neque perspiciatis. Tempore iusto doloremque dolor natus rem facilis commodi quia pariatur.`,
      date: subDays(new Date(), 13),
      response: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, ipsa quibusdam similique maiores error minus voluptates sequi assumenda dolorum tempora ad earum eligendi voluptas iusto tenetur, quas aspernatur accusantium temporibus.`,
      response_date: subDays(new Date(), 5),
    },
    {
      id: '30',
      name: 'Bill Washington',
      rating: 4,
      review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, temporibus voluptatibus! Odio expedita totam enim. Repellat doloribus ea neque perspiciatis. Tempore iusto doloremque dolor natus rem facilis commodi quia pariatur.`,
      date: subDays(new Date(), 13),
      response: null,
      response_date: null,
    },
  ],
};

function ReviewList(): ReactElement {
  return (
    <div>
      {data.results.map((item: IReview) => (
        <ReviewItem key={item.id} review={item} />
      ))}
    </div>
  );
}

export default ReviewList;
