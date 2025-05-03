
import React from 'react';
import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      
      <main className="container max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">About Art Vibe</h1>
            <p className="text-muted-foreground">
              Discover the story behind our platform
            </p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                Art Vibe is dedicated to bringing the world's most inspiring visual content right to your fingertips. 
                We believe that art and imagery have the power to inspire, educate, and transform. 
                Our platform provides a seamless way to discover, explore, and save stunning visuals from talented creators around the globe.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to millions of high-quality images from professional photographers</li>
                <li>Powerful search capabilities to find the perfect visual content</li>
                <li>Ability to save your favorite images for future reference</li>
                <li>Detailed information about each image and its creator</li>
                <li>A responsive, user-friendly interface accessible on any device</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Started</h2>
              <p>
                Art Vibe began as a passion project in 2023, born from the desire to create a platform that connects users with beautiful imagery in an intuitive way.
                Our team of designers and developers worked tirelessly to build an experience that prioritizes visual impact while maintaining simplicity.
              </p>
              <p className="mt-4">
                Today, Art Vibe continues to evolve with new features and improvements based on user feedback. We're committed to supporting both
                art enthusiasts who appreciate beautiful imagery and the talented photographers who create it.
              </p>
            </section>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Support Art Vibe</h3>
            <p>
              We're constantly working to improve Art Vibe and add new features. If you enjoy using our platform, 
              consider supporting us by sharing it with others who might appreciate beautiful imagery!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
