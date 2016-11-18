import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Offer from '../Offer';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial offers added into test db
const offers = [
  new Offer({ name: 'Offer 1', amount: 3, maximumRides: 10}),
  new Offer({ name: 'Offer 2', amount: 6, maximumRides: 15}),
  new Offer({ name: 'Offer 3', amount: 9, maximumRides: 20})
];

test.beforeEach('connect and add two offer entries', t => {
  connectDB(t, () => {

  });
});

test.afterEach.always(t => {
  dropDB(t);
});

test.serial('Should correctly give number of Offers', async t => {
  t.plan(4);
  await Offer.create(offers);
  const res = await request(app)
    .get('/api/offer')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(offers.length, res.body.length);

  const resWithLimit = await request(app)
    .get('/api/offers/2')
    .set('Accept', 'application/json');

  t.is(resWithLimit.status, 200);
  t.deepEqual(2, resWithLimit.body.length);
});
/*
 test.serial('Should send correct data when queried against an id', async t => {
 t.plan(2);

 const post = new Offer({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });
 post.save();

 const res = await request(app)
 .get('/api/posts/f34gb2bh24b24b2')
 .set('Accept', 'application/json');

 t.is(res.status, 200);
 t.is(res.body.post.name, post.name);
 });
 */

test.serial('Should correctly add an Offer and Get it', async t => {
  t.plan(9);

  const offer = { name: 'Foo Offer', amount: 1, maximumRides: 5 };
  const res = await request(app)
    .post('/api/offer')
    .send( offer )
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.name, offer.name );
  t.is(res.body.amount, offer.amount );
  t.is(res.body.maximumRides, offer.maximumRides );

  const newOffer = await Offer.findOne({ name: 'Foo Offer' }).exec();
  t.is(newOffer.name, 'Foo Offer');

  const resGet = await request(app)
    .get(`/api/offer/${res.body.id}`)
    .send();

  t.is(resGet.status, 200);
  t.is(resGet.body.name, offer.name );
  t.is(resGet.body.amount, offer.amount );
  t.is(resGet.body.maximumRides, offer.maximumRides );


});



test.serial('Should correctly delete an Offer', async t => {
  t.plan(9);

  const offer = { name: 'Foo Offer for Delete', amount: 1, maximumRides: 5 };
  const res = await request(app)
    .post('/api/offer')
    .send( offer )
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.name, offer.name );
  t.is(res.body.amount, offer.amount );
  t.is(res.body.maximumRides, offer.maximumRides );

  const resDelete = await request(app)
    .delete(`/api/offer/${res.body.id}`)
    .set('Accept', 'application/json');

  t.is(resDelete.status, 200);
  t.is(resDelete.body.name, offer.name );
  t.is(resDelete.body.amount, offer.amount );
  t.is(resDelete.body.maximumRides, offer.maximumRides );

  const queriedOffer = await Offer.findOne({
    name: offer.name
  }).exec();

  t.is(queriedOffer, null);
});
