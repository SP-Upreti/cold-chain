'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TransitionLink } from '@/components/shared';

type TransitionType = 
  | 'wave' 
  | 'curtain' 
  | 'zoom-blur' 
  | 'circle' 
  | 'diagonal' 
  | 'pixel' 
  | 'liquid';

const transitions: { name: string; type: TransitionType; description: string }[] = [
  {
    name: 'Wave Transition',
    type: 'wave',
    description: 'Smooth SVG wave layers sliding up with beautiful stagger effect',
  },
  {
    name: 'Curtain Transition',
    type: 'curtain',
    description: 'Multiple panels dropping down like theater curtains',
  },
  {
    name: 'Zoom Blur',
    type: 'zoom-blur',
    description: 'Dramatic zoom effect with blur for cinematic feel',
  },
  {
    name: 'Circle Expand',
    type: 'circle',
    description: 'Circular expansion from center with smooth reveal',
  },
  {
    name: 'Diagonal Wipe',
    type: 'diagonal',
    description: 'Layered diagonal wipe with directional flow',
  },
  {
    name: 'Pixel Grid',
    type: 'pixel',
    description: 'Grid of pixels animating from center outward',
  },
  {
    name: 'Liquid Morph',
    type: 'liquid',
    description: 'Organic liquid morphing animation with SVG paths',
  },
];

export default function TransitionsShowcase() {
  const [selectedTransition, setSelectedTransition] = useState<TransitionType>('liquid');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Page Transitions Showcase
          </h1>
          <p className="text-xl text-gray-300">
            7 stunning GSAP-powered page transitions
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Current: <span className="text-purple-400 font-bold">{selectedTransition}</span>
          </p>
        </div>

        {/* Transition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {transitions.map((transition) => (
            <div
              key={transition.type}
              className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                selectedTransition === transition.type
                  ? 'ring-4 ring-purple-500 scale-105'
                  : 'hover:scale-105'
              }`}
              onClick={() => setSelectedTransition(transition.type)}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3">{transition.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {transition.description}
                  </p>
                  
                  {selectedTransition === transition.type && (
                    <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Active
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">How to Use</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                1. Update your layout.tsx
              </h3>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
{`import LiquidMorphTransition from '@/components/transitions/liquid-morph-transition';

<LiquidMorphTransition>
  {children}
</LiquidMorphTransition>`}
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                2. Or use the TransitionSelector
              </h3>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
{`import TransitionSelector from '@/components/transitions/transition-selector';

<TransitionSelector type="liquid">
  {children}
</TransitionSelector>`}
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                3. Available Transitions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {transitions.map((t) => (
                  <div key={t.type} className="bg-gray-900 px-4 py-2 rounded-lg text-center">
                    <code className="text-pink-400">{t.type}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Test Navigation */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Test the Transition</h2>
          <p className="text-gray-400 mb-8">
            Click any link below to see the <span className="text-purple-400 font-bold">{selectedTransition}</span> transition in action
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <TransitionLink
              href="/"
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              Go to Home
            </TransitionLink>
            <TransitionLink
              href="/products"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105"
            >
              View Products
            </TransitionLink>
            <TransitionLink
              href="/about"
              className="bg-gradient-to-r from-pink-600 to-red-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-105"
            >
              About Us
            </TransitionLink>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-bold mb-2">GPU Accelerated</h3>
            <p className="text-gray-400 text-sm">
              All transitions use GPU-accelerated properties for smooth 60fps animations
            </p>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
            <p className="text-gray-400 text-sm">
              Customize colors, timing, direction, and more for each transition
            </p>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-xl font-bold mb-2">Mobile Optimized</h3>
            <p className="text-gray-400 text-sm">
              Tested and optimized for smooth performance on all devices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
