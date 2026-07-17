import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCcw, 
  Compass, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Calendar, 
  Flame, 
  MapPin, 
  Users, 
  Award,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [selectedModel, setSelectedModel] = useState('yatra');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [shadows, setShadows] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const modelViewerRef = useRef(null);
  const audioRef = useRef(null);
  const crowdAudioRef = useRef(null);

  const galleryItems = [
    {
      src: 'img/1.jpg',
      title: 'Deities of Puri',
      subtitle: 'Lord Jagannath, Balabhadra, and Subhadra seated on their ornate throne during Aarti worship.'
    },
    {
      src: 'img/2.jpg',
      title: 'The Sacred Temple Spire',
      subtitle: 'The magnificent Shikhara of the Shree Jagannath Temple in Puri, adorned with the Neelachakra.'
    },
    {
      src: 'img/3.jpg',
      title: 'Lord Jagannath\'s Floral Tahia',
      subtitle: 'Close-up of Lord Jagannath wearing the massive circular floral crown during Pahandi procession.'
    },
    {
      src: 'img/4.jpg',
      title: 'Sea of Devotion',
      subtitle: 'A high-angle view of the three grand chariots surrounded by millions of chanting devotees.'
    },
    {
      src: 'img/5.jpg',
      title: 'Darshan on the Chariot',
      subtitle: 'Lord Jagannath visible inside his towering chariot Nandighosha, surrounded by priests and sevayatas.'
    },
    {
      src: 'img/6.jpg',
      title: 'The Procession of Grace',
      subtitle: 'Lord Jagannath in his grand floral headgear as devotees gather around in deep prayer and ecstasy.'
    }
  ];

  const yatraTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'chariots', label: 'Chariots' },
    { id: 'rituals', label: 'Rituals' },
    { id: 'significance', label: 'Significance' },
    { id: 'mysteries', label: 'Mysteries' }
  ];

  const templeTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'mahaprasad', label: 'Mahaprasad' },
    { id: 'mysteries', label: 'Mysteries' }
  ];

  const currentTabs = selectedModel === 'yatra' ? yatraTabs : templeTabs;

  // Hook into model-viewer progress event
  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const onProgress = (event) => {
      const progress = event.detail.totalProgress;
      const percentage = Math.round(progress * 100);
      setLoadPercentage(percentage);
      if (progress === 1) {
        // Add a slight delay for smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    viewer.addEventListener('progress', onProgress);
    return () => {
      viewer.removeEventListener('progress', onProgress);
    };
  }, [selectedModel]);

  // Hook into model-viewer AR status changes for playing ambient audio
  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleARStatus = (event) => {
      const currentSrc = viewer.getAttribute('src');
      const isYatra = currentSrc && currentSrc.includes('JagannathRath_Yatra');
      if (event.detail.status === 'session-started') {
        // Pause flute audio in AR mode
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlayingAudio(false);
        }
        if (isYatra && crowdAudioRef.current) {
          crowdAudioRef.current.play().catch(err => {
            console.log("Crowd audio play failed: ", err);
          });
        }
      } else if (event.detail.status === 'not-presenting') {
        if (crowdAudioRef.current) {
          crowdAudioRef.current.pause();
          crowdAudioRef.current.currentTime = 0;
        }
        // Resume flute audio when exiting AR mode
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlayingAudio(true);
          }).catch(err => {
            console.log("Audio resume failed: ", err);
          });
        }
      }
    };

    viewer.addEventListener('ar-status', handleARStatus);
    return () => {
      viewer.removeEventListener('ar-status', handleARStatus);
    };
  }, []);

  // Hook to automatically play flute music once the 3D model loads fully
  useEffect(() => {
    if (!isLoading && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(err => {
        console.log("Audio auto-play failed/blocked by browser policy:", err);
      });
    }
  }, [isLoading]);

  // Controls functions
  const handleModelChange = (model) => {
    if (model === selectedModel) return;
    setSelectedModel(model);
    setIsLoading(true);
    setLoadPercentage(0);
    setActiveTab('overview');
  };

  const handleResetCamera = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = 'unset unset unset';
      modelViewerRef.current.fieldOfView = 'unset';
    }
  };

  const handleToggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  const handleToggleShadows = () => {
    setShadows(!shadows);
  };

  const handleTriggerAR = () => {
    if (modelViewerRef.current && modelViewerRef.current.canActivateAR) {
      modelViewerRef.current.activateAR();
    } else {
      alert("AR is only available on supported mobile devices.");
    }
  };

  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlayingAudio) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log("Audio play failed: ", err);
      });
    }
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="app-container">
      {/* Audio element for devotional flute instrumental */}
      <audio 
        ref={audioRef} 
        src="flute.mp3" 
        loop
      />
      {/* Audio element for crowd ambient sound in AR */}
      <audio 
        ref={crowdAudioRef} 
        src="crowd.mp3" 
        loop
      />

      {/* Header */}
      <header className="app-header">
        <h1>JAGANNATH PURI EXPERIENCE</h1>
        <p>A beautiful 3D & AR view of the Sacred Temple and Chariot Festival</p>
        <div className="header-accent-line"></div>
      </header>

      {/* Experience Switcher */}
      <div className="experience-selector">
        <button 
          className={`selector-btn ${selectedModel === 'yatra' ? 'active' : ''}`}
          onClick={() => handleModelChange('yatra')}
        >
          <Flame size={18} />
          <span>Rath Yatra Chariot</span>
        </button>
        <button 
          className={`selector-btn ${selectedModel === 'temple' ? 'active' : ''}`}
          onClick={() => handleModelChange('temple')}
        >
          <Compass size={18} />
          <span>Jagannath Puri Temple</span>
        </button>
      </div>

      {/* Main Dashboard */}
      <main className="dashboard-grid">
        
        {/* Left Side: 3D Viewer inside Glass Card */}
        <section className="glass-card viewer-wrapper">
          
          {/* Custom Loader */}
          {isLoading && (
            <div className="model-loading-overlay">
              <div className="loader-spinner"></div>
              <div className="loader-text">Loading {selectedModel === 'yatra' ? 'Chariot Model' : 'Temple Model'}</div>
              <div className="loader-percentage">{loadPercentage}%</div>
            </div>
          )}

          {/* Prominent AR CTA Button */}
          {!isLoading && (
            <button className="ar-cta-button" onClick={handleTriggerAR}>
              <Sparkles size={18} className="cta-icon-sparkle" />
              <span>Bring the Model to Life (AR)</span>
            </button>
          )}

          {/* Model Viewer Web Component */}
          <model-viewer
            ref={modelViewerRef}
            id="yatra-viewer"
            src={selectedModel === 'yatra' ? 'JagannathRath_Yatra-v1.glb' : 'jagannath_puri_temple-v1.glb'}
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-placement="floor"
            ar-scale="auto"
            bounds="tight"
            camera-controls
            auto-rotate={autoRotate ? "" : undefined}
            shadow-intensity={shadows ? "1.5" : "0"}
            shadow-softness={shadows ? "0.5" : "0"}
            exposure="1"
            alt={selectedModel === 'yatra' ? '3D Model of the Jagannath Rath Yatra Chariot' : '3D Model of the Jagannath Puri Temple'}
          >
            {/* Built-in AR scan prompt overlay */}
            <div slot="ar-prompt" id="ar-prompt">
              <img src="https://modelviewer.dev/shared/assets/hand.png" alt="Scan floor instruction" />
            </div>

            {/* Custom 3D Overlay Controls */}
            <div className="viewer-controls">
              <button 
                className={`control-btn ${autoRotate ? 'active' : ''}`} 
                onClick={handleToggleAutoRotate}
                title="Toggle Auto-Rotate"
              >
                <Compass size={20} />
              </button>
              <button 
                className="control-btn" 
                onClick={handleResetCamera}
                title="Reset Camera View"
              >
                <RotateCcw size={20} />
              </button>
              <button 
                className={`control-btn ${shadows ? 'active' : ''}`} 
                onClick={handleToggleShadows}
                title="Toggle Shadows"
              >
                <Sparkles size={20} />
              </button>
              <button 
                className="control-btn" 
                onClick={handleTriggerAR}
                title="View in Augmented Reality (AR)"
              >
                <Maximize size={20} />
              </button>
            </div>
          </model-viewer>
        </section>

        {/* Right Side: Tabbed Information Panel & Sound controls */}
        <section className="sidebar-panel-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Audio Control Widget */}
          <div className={`glass-card audio-card ${isPlayingAudio ? 'playing' : ''}`}>
            <div className="audio-info">
              <div className={`audio-icon-pulse ${isPlayingAudio ? 'playing' : ''}`}>
                {isPlayingAudio ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </div>
              <div className="audio-meta">
                <h4>Temple Music</h4>
                <p>Traditional Flute Instrumental</p>
              </div>
            </div>
            
            {/* Animated Audio Wave bars */}
            <div className="wave-container">
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
            </div>

            <button className="play-toggle-btn" onClick={handleToggleAudio}>
              {isPlayingAudio ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
            </button>
          </div>

          {/* Interactive Info Panel */}
          <div className="glass-card sidebar-panel">
            <div className="tabs-header">
              {currentTabs.map(tab => (
                <button 
                  key={tab.id}
                  className={`tab-trigger ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="panel-body">
              {selectedModel === 'yatra' ? (
                <>
                  {activeTab === 'overview' && (
                    <div className="tab-pane">
                      <div className="tab-image-header">
                        <img src="img/4.jpg" alt="Rath Yatra Chariots" />
                      </div>
                      <h3>The Chariot Festival</h3>
                      <p>
                        The Jagannath Rath Yatra is a famous chariot festival. It is held every year in the holy city of Puri, Odisha, India. It is one of the oldest festivals in the world.
                      </p>
                      <p>
                        Every year in June or July, the three main statues—Lord Jagannath, his brother Balabhadra, and his sister Subhadra—are taken out of the temple. They travel in three huge wooden chariots to the Gundicha Temple. This represents a visit to their aunt's home.
                      </p>
                      <div className="highlight-box">
                        <div className="highlight-title">When is it held?</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                          It starts in mid-summer (June or July) each year.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'chariots' && (
                    <div className="tab-pane">
                      <div className="tab-image-header">
                        <img src="img/5.jpg" alt="Lord on Chariot" />
                      </div>
                      <h3>The Big Chariots</h3>
                      <p>
                        The three huge chariots are built brand new every year using special wood. Traditional craftsmen build them by hand without using any metal nails.
                      </p>
                      
                      <div className="chariot-detail-grid">
                        <div className="chariot-stat-item">
                          <div className="chariot-stat-label">Nandighosha (Jagannath)</div>
                          <div className="chariot-stat-value">16 Wheels • 45 ft tall</div>
                        </div>
                        <div className="chariot-stat-item">
                          <div className="chariot-stat-label">Taladhwaja (Balabhadra)</div>
                          <div className="chariot-stat-value">14 Wheels • 44 ft tall</div>
                        </div>
                        <div className="chariot-stat-item">
                          <div className="chariot-stat-label">Darpadalana (Subhadra)</div>
                          <div className="chariot-stat-value">12 Wheels • 43 ft tall</div>
                        </div>
                        <div className="chariot-stat-item">
                          <div className="chariot-stat-label">Chariot Colorway</div>
                          <div className="chariot-stat-value">Red, Yellow, Green, Black</div>
                        </div>
                      </div>

                      <div className="highlight-box" style={{ background: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgba(212, 175, 55, 0.12)' }}>
                        <div className="highlight-title" style={{ color: 'var(--color-secondary)' }}>Model Details</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                          The 3D model shows the main chariot (Nandighosha). It has traditional flags, wooden horses, and hand-carved guard rails.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'rituals' && (
                    <div className="tab-pane">
                      <div className="tab-image-header">
                        <img src="img/3.jpg" alt="Rituals of Rath Yatra" />
                      </div>
                      <h3>Festival Rituals</h3>
                      <p>
                        The festival has many special steps that have been followed for hundreds of years:
                      </p>
                      <p>
                        <strong>Pahandi:</strong> Carrying the heavy wooden statues out of the temple and putting them onto the chariots.
                      </p>
                      <p>
                        <strong>Chhera Pahanra:</strong> The king of Puri sweeps the chariot floors with a gold broom and sprinkles sandalwood water. This shows that everyone is equal before God.
                      </p>
                      <p>
                        <strong>Bahuda Yatra:</strong> The return journey of the statues back to the main temple after staying 9 days at Gundicha Temple.
                      </p>
                    </div>
                  )}

                  {activeTab === 'significance' && (
                    <div className="tab-pane">
                      <div className="tab-image-header">
                        <img src="img/6.jpg" alt="Devotion of Masses" />
                      </div>
                      <h3>Meaning of the Festival</h3>
                      <p>
                        Usually, only Hindus can enter the main temple. But during Rath Yatra, the Lord comes out onto the streets so people of all religions can see him.
                      </p>
                      <p>
                        Many believe that touching or pulling the chariots brings good luck and cleanses the soul. The English word <strong>"Juggernaut"</strong> comes from Jagannath, because these chariots are so huge and unstoppable.
                      </p>
                    </div>
                  )}

                  {activeTab === 'mysteries' && (
                    <div className="tab-pane">
                      <h3>Hidden Mysteries</h3>
                      <p>
                        Here are some deep secrets about the temple that very few people know:
                      </p>
                      <p>
                        <strong>1. The Dream Search:</strong> Every 12 to 19 years, new wooden statues are made. The priests must search for a special Neem tree. The tree must have no bird nests, must have a snake hole at its roots, and must naturally show the symbols of Lord Vishnu (like a conch or wheel) on its bark. The priests say a Goddess shows them where the tree is in their dreams.
                      </p>
                      <p>
                        <strong>2. The Temple Graveyard:</strong> The old wooden statues are buried in a secret temple graveyard called <em>Koili Baikuntha</em>. Even though Neem wood takes years to rot, the old statues completely turn to dust within a few days of burial.
                      </p>
                      <p>
                        <strong>3. The Forbidden King:</strong> In the 1700s, the king of Puri was banned from entering the temple. The priests were sad, so they painted a picture of Lord Jagannath on the outer wall near the main gate. This allowed the king to pray to his Lord from outside. That painting is still there today (called <em>Patitapabana</em>).
                      </p>
                      <p>
                        <strong>4. Reverse Wind direction:</strong> In most coastal areas, the breeze blows from the sea to the land during the day, and from land to sea at night. But in Puri, it is the exact opposite! The wind blows towards the sea in the day, and towards the land at night.
                      </p>
                      <p>
                        <strong>5. Lifting the Giant Wheel:</strong> The metallic wheel on top of the temple spire weighs over 2,200 kilograms (4,800 lbs). In the 12th century, builders managed to lift this heavy wheel 214 feet high using only ropes and ramps made of sand.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {activeTab === 'overview' && (
                    <div className="tab-pane">
                      <div className="tab-image-header">
                        <img src="img/1.jpg" alt="Holy Altar Deities" />
                      </div>
                      <h3>The Sacred Temple</h3>
                      <p>
                        The Shree Jagannath Temple of Puri is a sacred Hindu temple dedicated to Lord Jagannath, a form of Lord Vishnu. Located in Puri, Odisha, it was built in the 12th century by the Eastern Ganga dynasty king, Anantavarman Chodaganga Deva.
                      </p>
                      <p>
                        The temple is famous for being one of the Char Dham pilgrimage sites (four sacred Hindu temples). It houses the wooden deities of Lord Jagannath, Lord Balabhadra, and Goddess Subhadra.
                      </p>
                      <div className="highlight-box" style={{ background: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgba(212, 175, 55, 0.12)' }}>
                        <div className="highlight-title" style={{ color: 'var(--color-secondary)' }}>Char Dham Destination</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                          It is considered highly auspicious for Hindus to visit this temple at least once in their lifetime.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'architecture' && (
                    <div className="tab-pane">
                      <div className="tab-image-header">
                        <img src="img/2.jpg" alt="Temple Tower" />
                      </div>
                      <h3>Spiritual Architecture</h3>
                      <p>
                        Built in the classic Kalinga architectural style, the main temple is surrounded by a massive double wall: the outer <em>Meghanada Pacheri</em> and the inner <em>Kurma Bedha</em>.
                      </p>
                      <div className="chariot-detail-grid">
                        <div className="chariot-stat-item">
                          <div className="chariot-stat-label">Main Spire (Bada Deula)</div>
                          <div className="chariot-stat-value">214 ft tall (65m)</div>
                        </div>
                        <div className="chariot-stat-item">
                          <div className="chariot-stat-label">The Sacred Wheel</div>
                          <div className="chariot-stat-value">Neelachakra (Ashtadhatu)</div>
                        </div>
                        <div className="chariot-stat-item">
                          <div className="chariot-stat-label">Main Entrances</div>
                          <div className="chariot-stat-value">4 Gates (facing 4 directions)</div>
                        </div>
                        <div className="chariot-stat-item">
                          <div className="chariot-stat-label">Temple Sprawls</div>
                          <div className="chariot-stat-value">10+ Acres complex</div>
                        </div>
                      </div>
                      <p style={{ marginTop: '8px' }}>
                        The four main gates are decorated with beautiful sculptures: <strong>Singhadwara</strong> (Lion Gate - East), <strong>Vyaghradwara</strong> (Tiger Gate - West), <strong>Hastidwara</strong> (Elephant Gate - North), and <strong>Ashwadwara</strong> (Horse Gate - South).
                      </p>
                    </div>
                  )}

                  {activeTab === 'mahaprasad' && (
                    <div className="tab-pane">
                      <h3>The World's Largest Kitchen</h3>
                      <p>
                        The temple's holy kitchen (<em>Rosaghara</em>) is a marvel. Around 500 cooks and 300 helpers prepare the <em>Mahaprasad</em> (sacred food offerings) every single day.
                      </p>
                      <p>
                        <strong>Chappan Bhog:</strong> 56 unique vegetarian dishes are prepared and offered to the deities daily, which is then distributed to the pilgrims.
                      </p>
                      <div className="highlight-box">
                        <div className="highlight-title">Unique Cooking Technique</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                          Food is cooked in exactly seven clay pots stacked on top of each other over a wood fire. Miraculously, the pot at the very top cooks first, followed by the next ones down, and the bottom pot cooks last.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'mysteries' && (
                    <div className="tab-pane">
                      <h3>Unexplained Mysteries</h3>
                      <p>
                        Science and engineering have yet to explain many unusual features of the Jagannath Temple:
                      </p>
                      <p>
                        <strong>1. The Wind Defying Flag:</strong> The flag mounted on the top of the temple spire always flutters in the opposite direction of the wind. A priest climbs the 214-foot spire every day to change it.
                      </p>
                      <p>
                        <strong>2. Shadowless Dome:</strong> At any time of the day, from any angle, the shadow of the main temple dome is never visible on the ground.
                      </p>
                      <p>
                        <strong>3. Silence of the Ocean:</strong> When you enter the temple through the main <em>Singhadwara</em> (Lion Gate), the sound of the ocean waves (which are just yards away) is instantly and completely blocked out. When you step back outside, the sound returns.
                      </p>
                      <p>
                        <strong>4. No Fly Zone:</strong> Neither birds nor planes ever fly over the temple dome, unlike other structures where birds are constantly perched on top.
                      </p>
                      <p>
                        <strong>5. Consistent Food Quantity:</strong> Whether there are 2,000 or 200,000 visitors on a given day, the Mahaprasad cooked is always exactly sufficient. No food is ever wasted, and no one goes home hungry.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Divine Darshan Gallery */}
      <section className="glass-card gallery-section">
        <div className="gallery-header">
          <h2>Divine Darshan Gallery</h2>
          <p>Immerse yourself in the sacred sights and spiritual energy of Puri</p>
          <div className="gallery-accent-line"></div>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div key={index} className="gallery-card" onClick={() => setSelectedImage(item)}>
              <div className="gallery-img-container">
                <img src={item.src} alt={item.title} className="gallery-img" />
                <div className="gallery-img-overlay">
                  <div className="gallery-zoom-icon">🔍</div>
                </div>
              </div>
              <div className="gallery-card-body">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="stats-grid">
        {selectedModel === 'yatra' ? (
          <>
            <div className="glass-card stat-card">
              <Calendar className="stat-icon" size={24} />
              <div className="stat-number">825+</div>
              <div className="stat-label">Years of History</div>
            </div>
            <div className="glass-card stat-card">
              <Award className="stat-icon" size={24} />
              <div className="stat-number">3</div>
              <div className="stat-label">Colossal Chariots</div>
            </div>
            <div className="glass-card stat-card">
              <MapPin className="stat-icon" size={24} />
              <div className="stat-number">3 km</div>
              <div className="stat-label">Procession Route</div>
            </div>
            <div className="glass-card stat-card">
              <Users className="stat-icon" size={24} />
              <div className="stat-number">1M+</div>
              <div className="stat-label">Yearly Pilgrims</div>
            </div>
          </>
        ) : (
          <>
            <div className="glass-card stat-card">
              <Calendar className="stat-icon" size={24} />
              <div className="stat-number">1161</div>
              <div className="stat-label">Year of Construction</div>
            </div>
            <div className="glass-card stat-card">
              <Award className="stat-icon" size={24} />
              <div className="stat-number">214 ft</div>
              <div className="stat-label">Spire Height</div>
            </div>
            <div className="glass-card stat-card">
              <Flame className="stat-icon" size={24} />
              <div className="stat-number">56</div>
              <div className="stat-label">Chappan Bhog Dishes</div>
            </div>
            <div className="glass-card stat-card">
              <Users className="stat-icon" size={24} />
              <div className="stat-number">20k+</div>
              <div className="stat-label">Daily Pilgrims Fed</div>
            </div>
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 Jagannath Rath Yatra Immersive Experience. Made with love and devotion.</p>
      </footer>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage.src} alt={selectedImage.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
