import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

// Main App component for the resume
const App = () => {
    // Ref for the Three.js canvas element
    const mountRef = useRef(null);
    // State to manage the active section for potential future navigation (not implemented as paged scroll)
    const [activeSection, setActiveSection] = useState('summary');
    // Ref to store mouse coordinates for Three.js interaction
    const mouse = useRef(new THREE.Vector2());

    // Function to handle smooth scrolling to sections (optional, for future navigation)
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    // Effect hook for setting up and cleaning up the Three.js animation
    useEffect(() => {
        let scene, camera, renderer, particles, animationId;

        // Initialize Three.js scene, camera, and renderer
        const init = () => {
            // Scene
            scene = new THREE.Scene();

            // Camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 2; // Position camera slightly back

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Alpha true for transparent background
            renderer.setSize(window.innerWidth, window.innerHeight);
            mountRef.current.appendChild(renderer.domElement);
            renderer.domElement.style.position = 'fixed';
            renderer.domElement.style.top = '0';
            renderer.domElement.style.left = '0';
            renderer.domElement.style.zIndex = '-1'; // Send to background
            renderer.domElement.style.opacity = '0.15'; // Subtle opacity

            // Particles geometry and material
            const particleCount = 1000;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            const color = new THREE.Color();

            for (let i = 0; i < particleCount; i++) {
                // Position particles randomly in a cube
                positions[i * 3] = (Math.random() - 0.5) * 10; // x
                positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
                positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z

                // Assign a subtle color (e.g., light blue/white)
                color.setHSL(0.6 + Math.random() * 0.2, 0.5, 0.5 + Math.random() * 0.5); // Hue, Saturation, Lightness
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.02, // Size of each particle
                vertexColors: true, // Use vertex colors
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending, // For glowing effect
                sizeAttenuation: true // Particles further away appear smaller
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);
        };

        // Animation loop
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Rotate particles slowly
            if (particles) {
                particles.rotation.x += 0.0005;
                particles.rotation.y += 0.0008;
            }

            // Adjust camera position based on mouse movement for parallax effect
            // Smoothly interpolate camera position towards mouse influence
            camera.position.x += (mouse.current.x * 0.1 - camera.position.x) * 0.05; // 0.1 is sensitivity, 0.05 is interpolation speed
            camera.position.y += (mouse.current.y * 0.1 - camera.position.y) * 0.05;
            camera.lookAt(scene.position); // Always look at the center of the scene

            renderer.render(scene, camera);
        };

        // Handle window resize
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        // Handle mouse movement for interactive animation
        const onMouseMove = (event) => {
            // Normalize mouse coordinates to -1 to +1 range
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        // Initialize and start animation
        init();
        animate();

        // Add event listeners
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mousemove', onMouseMove);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('mousemove', onMouseMove);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            // Dispose of Three.js resources to prevent memory leaks
            if (scene) scene.dispose();
            if (camera) camera.destroy(); // Cameras don't have dispose, but it's good practice to clear references
            if (renderer) renderer.dispose();
            if (particles && particles.geometry) particles.geometry.dispose();
            if (particles && particles.material) particles.material.dispose();
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    return (
        // Main container for the resume, with a dark background and Inter font
        <div className="min-h-screen bg-gray-900 text-gray-100 font-inter relative">
            {/* Three.js canvas mount point */}
            <div ref={mountRef} className="absolute inset-0 z-0"></div>

            {/* Content container, centered and with max width */}
            <div className="relative z-10 max-w-4xl mx-auto p-6 md:p-8 lg:p-10 bg-gray-800 bg-opacity-90 rounded-lg shadow-2xl my-8">
                {/* Header Section */}
                <header className="text-center mb-10 pb-6 border-b border-gray-700">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-2 rounded-md p-2">Sugam Pokhrel</h1>
                    <p className="text-lg md:text-xl text-gray-300">Full Stack Web Developer | IT Student</p>
                    <div className="mt-4 text-sm md:text-base space-y-1">
                        <p className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            3950 E. Newman Rd, Joplin, MO
                        </p>
                        <p className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            4174831795
                        </p>
                        <p className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            PokhrelS003@mymail.mssu.edu
                        </p>
                        <p className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.68 11.53a1 1 0 010 1.415l-6 6a1 1 0 01-1.415 0l-6-6a1 1 0 111.415-1.415L9 16.085V4a1 1 0 112 0v12.085l4.293-4.293a1 1 0 011.415 0z" clipRule="evenodd" />
                            </svg>
                            <a href="https://www.linkedin.com/in/sugam-pokhrel/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">LinkedIn</a>
                        </p>
                        <p className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.163 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.007.07 1.532 1.03 1.532 1.03.89 1.529 2.341 1.088 2.91.83.091-.645.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.949 0-1.09.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.65 0 0 .84-.268 2.75 1.025A9.564 9.564 0 0110 4.547c.85.002 1.7.114 2.49.331 1.909-1.293 2.747-1.025 2.747-1.025.546 1.38.202 2.397.099 2.65.64.698 1.028 1.592 1.028 2.682 0 3.848-2.338 4.694-4.562 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .267.18.579.688.482C17.135 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                            </svg>
                            <a href="https://github.com/sugam-pokhrel" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">github.com/sugam-pokhrel</a>
                        </p>
                    </div>
                </header>

                {/* Summary Section */}
                <section id="summary" className="mb-10 p-6 bg-gray-700 bg-opacity-70 rounded-lg shadow-inner">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">Summary</h2>
                    <p className="text-lg leading-relaxed">
                        I am a student at Missouri Southern State University, eager to contribute in new work environments and adapt to diverse working conditions. I possess experience as a full-stack web developer, proficient in technologies such as REACT-js, Node.js, and NEXT-js, and programming languages including JavaScript and Python.
                    </p>
                </section>

                {/* Experience Section */}
                <section id="experience" className="mb-10 p-6 bg-gray-700 bg-opacity-70 rounded-lg shadow-inner">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">Experience</h2>
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-gray-200">Python Developer Intern</h3>
                        <p className="text-blue-300">Pay Nep Pvt. Ltd (Moru Digital Wallet) (Kathmandu, Nepal)</p>
                        <p className="text-sm text-gray-400 mb-2">Oct, 2023 - May, 2024</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            <li>Developed an electricity bill scheduler and an automated billing system using Python and Celery.</li>
                        </ul>
                    </div>
                </section>

                {/* Education Section */}
                <section id="education" className="mb-10 p-6 bg-gray-700 bg-opacity-70 rounded-lg shadow-inner">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">Education</h2>
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-gray-200">Bachelors in Information Technology</h3>
                        <p className="text-blue-300">Missouri Southern State University (Joplin)</p>
                        <p className="text-sm text-gray-400">Aug, 2024 - Jan, 2025</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-200">Bachelors in IT</h3>
                        <p className="text-blue-300">Sacramento City College (Sacramento, CA)</p>
                        <p className="text-sm text-gray-400">Jan, 2025 - Present</p>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="mb-10 p-6 bg-gray-700 bg-opacity-70 rounded-lg shadow-inner">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">Projects</h2>
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-gray-200">TempEmail</h3>
                        <p className="text-gray-300 mb-1">One-stop solution for temporary Emails.</p>
                        <p className="text-sm text-gray-400 mb-2">Tech Stack: NEXT-JS (frontend), SMTP Linux server</p>
                        <a href="https://tempemail.space/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">https://tempemail.space/</a>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-gray-200">Blinkbox</h3>
                        <p className="text-gray-300 mb-1">Platform for unlimited cloud storage</p>
                        <p className="text-sm text-gray-400 mb-2">Tech Stack: NEXT-Js, AWS S3 bucket for storage</p>
                        <a href="https://blinkbox-sugampokhrel.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">https://blinkbox-sugampokhrel.netlify.app/</a>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-200">School Website</h3>
                        <p className="text-gray-300 mb-1">Created a basic website for a school in Nepal.</p>
                        <a href="https://goldenfutureeducationfoundation.edu.np/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">https://goldenfutureeducationfoundation.edu.np/</a>
                    </div>
                </section>

                {/* Training/Certifications Section */}
                <section id="certifications" className="mb-10 p-6 bg-gray-700 bg-opacity-70 rounded-lg shadow-inner">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">Training/Certifications</h2>
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-gray-200">Introduction to Front-End Development</h3>
                        <p className="text-blue-300">Meta (Coursera)</p>
                        <a href="https://coursera.org/share/b4947cee7e7fc83c7f6aec86c8fded36" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">https://coursera.org/share/b4947cee7e7fc83c7f6aec86c8fded36</a>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-200">Backend and API Development using Node.js</h3>
                        <p className="text-blue-300">FreeCodeCamp</p>
                        <a href="https://www.freecodecamp.org/certification/sugam/back-end-development-and-apis" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">https://www.freecodecamp.org/certification/sugam/back-end-development-and-apis</a>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="p-6 bg-gray-700 bg-opacity-70 rounded-lg shadow-inner">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-3">
                        {['React', 'CSS', 'NodeJS', 'NEXT-js', 'Linux', 'Python', 'JavaScript'].map(skill => (
                            <span key={skill} className="bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-medium shadow-md">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default App;
