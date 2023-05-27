import { Router } from "express";

const router = Router();

router.get('/', (_, res) => {
  res.render('index', {
    title: 'Game play!',
    header: 'Game Board',
    body: 'game/index'
  });
})

export default router;