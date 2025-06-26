import { Button } from "@/components/custom/button";
import { useNavigate } from 'react-router-dom';
import { Rocket, Lock, Wallet, Mail, MapPin, Phone, User } from 'lucide-react';
import { useAppSelector } from "@/store/store-hooks";
import TextCarousel from "@/components/text-carousel";

const carouselTexts = [
  {
    title: "Send Bulk SMS Instantly in Tanzania",
    description: "Deliver messages to thousands of users with just one click. Fast, secure and reliable."
  },
  {
    title: "Grow Your Business With Pamtech",
    description: "Engage your audience effectively and increase conversions through targeted SMS campaigns."
  },
  {
    title: "Affordable Messaging Plans for Every Budget",
    description: "Choose from flexible prepaid or postpaid plans and start reaching customers today."
  }
];


 const customerLogos = [
  'logo.png',
  'logo.png',
  'logo.png',
  'logo.png',
  'logo.png',
  'logo.png',
              ];

const LandingPage = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
 

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <div className="flex items-center gap-2 pointer">
              <a href="/">
                <img src="/logo.png" alt="Pamtech Logo" className="h-6 md:h-10 lg:h-12 pointer" />
              </a>
            </div>
          <nav className="space-x-4 flex items-center">
              <a href="/pricing" className="font-bold text-base sm:text-lg hover:text-blue-600">Pricing</a>
              <a
                href="#"
                className="font-bold text-base sm:text-lg hover:text-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("contact");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact us
              </a>
              {isAuthenticated ? (
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 text-base sm:text-lg"
                >
                  <User className="w-6 h-6" />
                <span className="text-sm sm:text-base">My Account</span>
                </Button>
              ) : (
                <div className="flex gap-2">
              <Button onClick={() => navigate("/sign-in")} className="text-base sm:text-lg">
                  Sign in
                </Button>
                <Button onClick={() => navigate("/sign-up")} className="text-base sm:text-lg">
                  Sign Up
                </Button>

                </div>
                
              )}
            </nav>
        </div>
      </header>

      {/* Hero Section */}
     <section className="flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fadeIn mb-0 p-0  min-h-[50vh]"
          style={{
            backgroundImage: `linear-gradient(to left, var(--brand-color-right), var(--brand-color-left))`,
          }}
        >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
       <div className="text-center md:text-left">
        <TextCarousel items={carouselTexts} interval={6000} />
      <Button className="h-14 text-lg px-8 py-4 mt-4" onClick={() => navigate('/sign-up')}>
        Get Started
      </Button>
 
        </div>



          {/* Image */}
            <div className="w-full h-full flex items-center justify-center">
          <img
            src="/lady.webp"
            alt="User using system"
            className="rounded-xl h-full max-w-xs sm:max-w-sm md:max-w-full"
            style={{ height: "90%" }}
              />
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Pamtech Bulk SMS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           <FeatureCard 
              icon={<Rocket className="w-10 h-10 mx-auto text-blue-500 mb-4" />} 
              title="Fast Delivery" 
              description="Deliver messages instantly to millions of users across Tanzania within seconds." 
              className="feature-card opacity-100"
            />
            <FeatureCard 
              icon={<Lock className="w-10 h-10 mx-auto text-green-500 mb-4" />} 
              title="Secure & Reliable" 
              description="Our platform ensures secure communication and high uptime for critical business use." 
              className="feature-card opacity-100 animate-delay-100"
            />
            <FeatureCard 
              icon={<Wallet className="w-10 h-10 mx-auto text-purple-500 mb-4" />} 
              title="Affordable Pricing" 
              description="Get the best rates per message with flexible postpaid and prepaid plans." 
              className="feature-card opacity-100 animate-delay-200"
            />
          </div>
        </div>
        <div className="flex items-center justify-center h-64"><Button className="h-14 text-lg px-8 py-4" onClick={() => navigate('/sign-up')}>
              Try it today
            </Button>
            </div>
      </section>

      {/* Customer Logos Section */}
      <section className="bg-gray py-12">
         <h2 className="text-3xl font-bold text-center mb-6">Our Clients</h2>
         <p className=" text-center mb-6">Our Clients are our top Priority, and we are commited to providing them with the highest Level of service</p>
        <div className="container mx-auto px-6">
         
         <div className="overflow-hidden  max-w-screen-lg mx-auto">
            <div className="flex animate-marquee gap-12 whitespace-nowrap w-max">
              {[...Array(2)].flatMap(() =>
                customerLogos.map((logo, index) => (
                  <img
                    key={`${logo}-${index}`}
                    src={`/customers/${logo}`}
                    alt={`Customer ${index + 1}`}
                    className="h-12 w-auto object-contain mx-4"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      

      {/* About & Contact */}
      <section
        id="about"
        className="py-16 bg-white mb-0"
        style={{
          backgroundImage: `linear-gradient(to left, var(--brand-color-right), var(--brand-color-left))`,
        }}
      >
        <div className="container mx-auto px-6">
          {/* You can add an "About Us" section here if needed */}

          {/* Contact Section */}
          <section id="contact" className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Have questions or want to discuss a project? We'd love to hear from you! Reach out via WhatsApp, email, or visit our office.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ContactCard icon={<Phone className="w-10 h-10 mx-auto text-green-500 mb-4" />} title="WhatsApp Us" value="+255 717 757 750" link="https://wa.me/255717757750" />
                <ContactCard icon={<Mail className="w-10 h-10 mx-auto text-blue-500 mb-4" />} title="Email Us" value="info@pamtech.co.tz" link="mailto:info@pamtech.co.tz" />
                <ContactCard icon={<MapPin className="w-10 h-10 mx-auto text-red-500 mb-4" />} title="Visit Our Office" value="New Safari Hotel Rd, Arusha 23103" link="https://maps.app.goo.gl/hMhtnx6hnCRkuzm58" />
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t mt-0 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} <a href="https://pamtech.co.tz" className="hover:underline">Pamtech Web Services</a>. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="https://pamtech.co.tz/terms-of-service/" className="hover:underline">Terms of Service</a>
            <a href="https://pamtech.co.tz/privacy-policy/" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Reusable Card Components with TypeScript

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => (
  <div className={`text-center p-6 border rounded-lg hover:shadow-lg transition-all duration-300 ${className}`}>
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
};

export const ContactCard: React.FC<ContactCardProps> = ({ icon, title, value, link }) => {
  const cardContent = (
    <>
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{value}</p>
    </>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-blue-50 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{ textDecoration: "none" }}
    >
      {cardContent}
    </a>
  ) : (
    <div className="bg-blue-50 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition">
      {cardContent}
    </div>
  );
};

export default LandingPage;




