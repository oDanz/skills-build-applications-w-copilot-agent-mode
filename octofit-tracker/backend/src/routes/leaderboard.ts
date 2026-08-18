import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await Leaderboard.find().populate('user').sort({ rank: 1, points: -1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;