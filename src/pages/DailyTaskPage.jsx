import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ActiveHabitPack from '../components/dashboard/ActiveHabitPack.jsx';
import BreathingWidget from '../components/dashboard/BreathingWidget.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import API from '../api';

const DailyTaskPage = () => {
  const { userInfo } = useAuth();
  const [breathingComplete, setBreathingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data } = await API.get('/breathing/today');
        setBreathingComplete(data.completed);
      } catch (err) {
        console.error("Failed to check breathing status", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkStatus();
  }, []);

  const handleBreathingComplete = () => {
    setBreathingComplete(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary-text">
              Today's Focus
            </h1>
            <p className="mt-2 text-lg text-primary-text text-opacity-80">
              Hello, {userInfo?.name || 'Friend'}. Let's complete your daily check-in.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center p-6 bg-white rounded-lg shadow-md mt-8">
              Loading your progress...
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary-text mb-4">Step 1: A Moment of Calm</h2>
                <BreathingWidget onComplete={handleBreathingComplete} />
              </div>

              {!breathingComplete ? (
                <div className="p-4 mt-6 text-sm text-primary-text text-opacity-60 border border-dashed border-gray-300 rounded-md">
                  Complete the breathing session above to unlock your reflection task.
                </div>
              ) : (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-primary-text mb-4">Step 2: Your Daily Reflection</h2>
                  <ActiveHabitPack />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DailyTaskPage;
