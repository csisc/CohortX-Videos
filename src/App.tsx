/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlayCircle, Search, MonitorPlay, SkipForward } from 'lucide-react';
import { motion } from 'motion/react';
import { videos, Video } from './data';

export default function App() {
  const [activeVideo, setActiveVideo] = useState<Video>(videos[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentIndex = videos.findIndex(v => v.id === activeVideo.id);
  const hasNext = currentIndex < videos.length - 1;
  const handleNext = () => {
    if (hasNext) {
      setActiveVideo(videos[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
              <MonitorPlay className="w-5 h-5" />
            </div>
            <h1 className="font-medium text-lg tracking-tight">CohortX Showcase</h1>
          </div>
          
          <div className="relative hidden sm:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search presentations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder:text-neutral-600"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Mobile Search */}
        <div className="relative sm:hidden mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search presentations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder:text-neutral-600"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Video Player Area */}
          <div className="w-full lg:w-[65%] xl:w-[70%] flex-shrink-0">
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-neutral-800">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&rel=0`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <motion.h2 
                  key={activeVideo.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl md:text-2xl font-medium leading-tight text-neutral-50"
                >
                  {activeVideo.title}
                </motion.h2>
                <div className="mt-4 flex items-center text-sm text-neutral-400 gap-4">
                  <span className="flex items-center gap-1.5">
                    <PlayCircle className="w-4 h-4" />
                    Educational Presentation
                  </span>
                  <span>MICCAI 2026 CohortX</span>
                </div>
              </div>
              
              <button
                onClick={handleNext}
                disabled={!hasNext}
                className="flex flex-shrink-0 items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium text-sm transition-colors text-white"
              >
                Next Video
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="w-full lg:w-[35%] xl:w-[30%] flex flex-col h-full lg:max-h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-neutral-200">Playlist</h3>
              <span className="text-xs font-medium bg-neutral-800 text-neutral-400 px-2.5 py-1 rounded-full">
                {filteredVideos.length} {filteredVideos.length === 1 ? 'Video' : 'Videos'}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => {
                  const isActive = activeVideo.id === video.id;
                  return (
                    <button
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      className={`w-full group flex items-start gap-3 p-2.5 rounded-xl transition-all text-left ${
                        isActive 
                          ? 'bg-neutral-800/80 ring-1 ring-neutral-700' 
                          : 'hover:bg-neutral-900'
                      }`}
                    >
                      <div className="relative flex-shrink-0 w-32 aspect-video bg-neutral-800 rounded-lg overflow-hidden">
                        <img 
                          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className={`w-full h-full object-cover transition-transform duration-500 ${
                            isActive ? 'scale-105' : 'group-hover:scale-105'
                          }`}
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center backdrop-blur-[2px]">
                            <PlayCircle className="w-6 h-6 text-white drop-shadow-md" />
                          </div>
                        )}
                        {!isActive && (
                          <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-medium text-white">
                            Video
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 py-0.5">
                        <h4 className={`text-sm font-medium leading-snug line-clamp-2 ${
                          isActive ? 'text-indigo-400' : 'text-neutral-200 group-hover:text-white'
                        }`}>
                          {video.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1.5 line-clamp-1">
                          MICCAI 2026
                        </p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-12 px-4 bg-neutral-900/50 rounded-xl border border-neutral-800/50">
                  <p className="text-neutral-400 text-sm">No presentations found matching "{searchQuery}".</p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
