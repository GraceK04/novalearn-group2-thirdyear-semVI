import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaCheckCircle, FaThumbsUp, FaStar, FaUsers, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function HomeComponent() {
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
    const { ref: coursesRef, inView: coursesInView } = useInView({ triggerOnce: true });
    const { ref: whyChooseUsRef, inView: whyChooseUsInView } = useInView({ triggerOnce: true });
    const { ref: footerRef, inView: footerInView } = useInView({ triggerOnce: true });

    const heroControls = useAnimation();
    const coursesControls = useAnimation();
    const whyChooseUsControls = useAnimation();
    const footerControls = useAnimation();

    useEffect(() => {
        if (heroInView) heroControls.start('visible');
        if (coursesInView) coursesControls.start('visible');
        if (whyChooseUsInView) whyChooseUsControls.start('visible');
        if (footerInView) footerControls.start('visible');
    }, [heroControls, coursesControls, whyChooseUsControls, footerControls, heroInView, coursesInView, whyChooseUsInView, footerInView]);

    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const reasons = [
        { id: 1, icon: <FaCheckCircle className="text-purple-800 text-5xl mb-4" />, title: 'Quality Education', description: 'We provide top-notch education with experienced instructors.' },
        { id: 2, icon: <FaThumbsUp className="text-purple-800 text-5xl mb-4" />, title: 'Affordable price', description: 'Thousands of students can learn with an affordable price' },
        { id: 3, icon: <FaStar className="text-purple-800 text-5xl mb-4" />, title: 'Excellent Support', description: 'We offer excellent support to help you succeed.' },
        { id: 4, icon: <FaUsers className="text-purple-800 text-5xl mb-4" />, title: 'Community Focused', description: 'We build a strong community of learners and educators.' }
    ];

    return (
        <div className="bg-gradient-to-r from-purple-900 to-purple-700 min-h-screen">
            {/* Hero Section */}
            <section ref={heroRef} className='w-full py-24 p-4 relative z-10'>
                <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px] gap-8 items-center'>
                    <motion.div className='flex flex-col justify-center gap-4' initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true, amount: 0.5 }}>
                        <p className='py-2 text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 text-transparent bg-clip-text'>START TO SUCCESS</p>
                        <h1 className='md:leading-[42px] py-2 md:text-3xl text-lg font-semibold text-white'>Access to  <span className='text-purple-300'>premium quality</span> courses from  <span className='text-purple-300'> professional </span>instructors to a career of success</h1>
                        <p className='py-2 text-lg text-purple-300'>Learn at Nova Now!</p>
                    </motion.div>
                    <motion.img src="/assets/heroImg.png" alt="hero" className='hero-image' initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} viewport={{ once: true, amount: 0.5 }} />
                </div>
            </section>

            {/* Courses Section */}
            <motion.div ref={coursesRef} initial="hidden" animate={coursesControls} variants={fadeIn} className="py-16 bg-purple-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Courses</h2>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {/* Course 1 */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <img src="/assets/course1.jpg" alt="Course 1" className="w-full h-48 object-cover rounded-t-lg mb-6" />
                                <h3 className="text-xl font-bold mb-2">Web Development Fundamentals</h3>
                                <p className="text-gray-700 mb-4">Learn the basics of HTML, CSS, and JavaScript to build modern websites.</p>
                            </div>
                        </SwiperSlide>

                        {/* Course 2 */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <img src="/assets/course2.jpg" alt="Course 2" className="w-full h-48 object-cover rounded-t-lg mb-6" />
                                <h3 className="text-xl font-bold mb-2">Advanced JavaScript</h3>
                                <p className="text-gray-700 mb-4">Master advanced JavaScript concepts like closures, promises, and async/await.Learn at Nova Now.</p>
                            </div>
                        </SwiperSlide>

                        {/* Course 3 */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <img src="/assets/course3.jpg" alt="Course 3" className="w-full h-48 object-cover rounded-t-lg mb-6" />
                                <h3 className="text-xl font-bold mb-2">React for Beginners</h3>
                                <p className="text-gray-700 mb-4">Get started with React and build dynamic user interfaces and sharpen your skills with react!Learn now!</p>
                            </div>
                        </SwiperSlide>

                        {/* Course 4 */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <img src="/assets/course4.jpg" alt="Finance Course" className="w-full h-48 object-cover rounded-t-lg mb-6" />
                                <h3 className="text-xl font-bold mb-2">Personal Investment</h3>
                                <p className="text-gray-700 mb-4">Master budgeting, saving, and investing to secure your financial future.Sharpen your skills with Nova!</p>
                            </div>
                        </SwiperSlide>


                        {/* Course 5 */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <img src="/assets/course5.jpg" alt="Course 5" className="w-full h-48 object-cover rounded-t-lg mb-6" />
                                <h3 className="text-xl font-bold mb-2">UI/UX Design Principles</h3>
                                <p className="text-gray-700 mb-4">Understand the fundamentals of designing user-friendly interfaces,modernized UI.Learn at Nova Now!</p>
                            </div>
                        </SwiperSlide>

                        {/* Course 6 */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <img src="/assets/course6.jpg" alt="Course 6" className="w-full h-48 object-cover rounded-t-lg mb-6" />
                                <h3 className="text-xl font-bold mb-2">Data Structures</h3>
                                <p className="text-gray-700 mb-4">Master essential data structures and algorithms for coding interviews.Understand complex data structures.Learn At Nova Now!</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </motion.div>
            {/* Why Choose Us Section */}
            <motion.div ref={whyChooseUsRef} initial="hidden" animate={whyChooseUsControls} variants={fadeIn} className="w-full py-16 text-white" style={{ backgroundImage: `url(/assets/bg-color.jpg)` }}>
                <div className="container mx-auto px-6">
                    <h2 className="text-center text-4xl font-extrabold mb-12 text-purple-300">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reasons.map(reason => (
                            <motion.div key={reason.id} className="bg-purple-300 p-6 rounded-lg shadow-lg text-center hover:bg-purple-400 transition-colors duration-300" initial={{ opacity: 0, y: 50, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: reason.id * 0.2, ease: [0, 0.71, 0.2, 1.01] }}>
                                {reason.icon}
                                <h3 className="text-2xl font-semibold mb-4 text-purple-800">{reason.title}</h3>
                                <p className="text-purple-800">{reason.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Footer Section */}
            <motion.footer ref={footerRef} initial="hidden" animate={footerControls} variants={fadeIn} className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-12">
                <div className="container mx-auto px-6">
                    <motion.div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true, amount: 0.5 }}>
                        <motion.div className="text-center md:text-left" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} viewport={{ once: true, amount: 0.5 }}>
                            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                            <p className="mt-2 text-purple-200">Group2,Yangon,Myanmar</p>
                            <p className="mt-2 text-purple-200">Email:Group2@gmail.com</p>
                            <p className="mt-2 text-purple-200">Phone: (123) 456-7890</p>
                        </motion.div>
                        <motion.div className="flex space-x-6" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut", delay: 0.4 }} viewport={{ once: true, amount: 0.5 }}>
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                <a key={index} href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors duration-300">
                                    <Icon className="text-2xl" />
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>
                    <motion.div className="border-t border-purple-500 my-8" initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.6 }} viewport={{ once: true, amount: 0.5 }}></motion.div>
                    <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut", delay: 0.8 }} viewport={{ once: true, amount: 0.5 }}>
                        <p className="text-purple-300">&copy; 2024 Group 2, All rights reserved.</p>
                        <p className="text-purple-300 mt-2">Designed with ❤️ by Group 2</p>
                    </motion.div>
                </div>
            </motion.footer>
        </div>
    );
}