import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teamIds = {
      coreCrew: new mongoose.Types.ObjectId(),
      cardioCadets: new mongoose.Types.ObjectId(),
      flexForce: new mongoose.Types.ObjectId(),
    };

    const userIds = {
      maya: new mongoose.Types.ObjectId(),
      jordan: new mongoose.Types.ObjectId(),
      priya: new mongoose.Types.ObjectId(),
      theo: new mongoose.Types.ObjectId(),
      lina: new mongoose.Types.ObjectId(),
    };

    await Team.insertMany([
      {
        _id: teamIds.coreCrew,
        name: 'Core Crew',
        description: 'Strength-focused teammates building consistency through compound lifts.',
        members: [userIds.maya, userIds.jordan],
      },
      {
        _id: teamIds.cardioCadets,
        name: 'Cardio Cadets',
        description: 'Runners, cyclists, and rowers chasing weekly endurance goals.',
        members: [userIds.priya, userIds.theo],
      },
      {
        _id: teamIds.flexForce,
        name: 'Flex Force',
        description: 'Mobility and functional fitness fans keeping recovery in the plan.',
        members: [userIds.lina],
      },
    ]);

    await User.insertMany([
      {
        _id: userIds.maya,
        username: 'maya.miles',
        email: 'maya.miles@example.com',
        displayName: 'Maya Miles',
        team: teamIds.coreCrew,
      },
      {
        _id: userIds.jordan,
        username: 'jordan.lee',
        email: 'jordan.lee@example.com',
        displayName: 'Jordan Lee',
        team: teamIds.coreCrew,
      },
      {
        _id: userIds.priya,
        username: 'priya.patel',
        email: 'priya.patel@example.com',
        displayName: 'Priya Patel',
        team: teamIds.cardioCadets,
      },
      {
        _id: userIds.theo,
        username: 'theo.nguyen',
        email: 'theo.nguyen@example.com',
        displayName: 'Theo Nguyen',
        team: teamIds.cardioCadets,
      },
      {
        _id: userIds.lina,
        username: 'lina.rivera',
        email: 'lina.rivera@example.com',
        displayName: 'Lina Rivera',
        team: teamIds.flexForce,
      },
    ]);

    await Activity.insertMany([
      {
        user: userIds.maya,
        activityType: 'Strength Training',
        durationMinutes: 52,
        caloriesBurned: 430,
        activityDate: new Date('2026-08-10T14:30:00Z'),
      },
      {
        user: userIds.jordan,
        activityType: 'Indoor Cycling',
        durationMinutes: 45,
        caloriesBurned: 510,
        activityDate: new Date('2026-08-11T12:00:00Z'),
      },
      {
        user: userIds.priya,
        activityType: 'Trail Run',
        durationMinutes: 63,
        caloriesBurned: 690,
        activityDate: new Date('2026-08-12T10:15:00Z'),
      },
      {
        user: userIds.theo,
        activityType: 'Rowing',
        durationMinutes: 38,
        caloriesBurned: 420,
        activityDate: new Date('2026-08-13T16:45:00Z'),
      },
      {
        user: userIds.lina,
        activityType: 'Yoga Flow',
        durationMinutes: 40,
        caloriesBurned: 180,
        activityDate: new Date('2026-08-14T09:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: userIds.priya, points: 1280, rank: 1 },
      { user: userIds.jordan, points: 1165, rank: 2 },
      { user: userIds.maya, points: 1090, rank: 3 },
      { user: userIds.theo, points: 980, rank: 4 },
      { user: userIds.lina, points: 860, rank: 5 },
    ]);

    await Workout.insertMany([
      {
        title: 'Foundation Strength Circuit',
        description: 'A balanced full-body lift session built around squats, presses, and rows.',
        difficulty: 'beginner',
        durationMinutes: 35,
        exercises: ['Goblet squat', 'Dumbbell bench press', 'Seated row', 'Plank'],
      },
      {
        title: 'Tempo Run Builder',
        description: 'Intervals that help runners improve pace control without overloading recovery.',
        difficulty: 'intermediate',
        durationMinutes: 42,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Recovery jog', 'Cooldown walk'],
      },
      {
        title: 'Row Power Ladder',
        description: 'Progressive rowing pieces with short rests for power and conditioning.',
        difficulty: 'advanced',
        durationMinutes: 30,
        exercises: ['500m row', 'Rest', '750m row', 'Rest', '1000m row'],
      },
      {
        title: 'Mobility Reset',
        description: 'Low-impact movement focused on hips, shoulders, and trunk rotation.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Cat-cow', 'World\'s greatest stretch', 'Hip airplanes', 'Thread the needle'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
