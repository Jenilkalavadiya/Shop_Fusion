import React from "react";

const About = () => {
  return (
    <>
      <div className="font-sans">
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Welcome to Shop Fusion
            </h1>
            <p className="text-lg lg:text-xl mb-6">
              Your one-stop shop for amazing products at unbeatable prices.
            </p>
            <a
              href="/shop"
              className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg hover:bg-gray-200 transition duration-300"
            >
              Start Shopping
            </a>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg max-w-2xl mx-auto">
              At Shop Fusion, we believe in bringing the best products to our
              customers with the utmost care and reliability. Founded in 2020,
              we’ve built a company that focuses on customer satisfaction,
              quality, and fast delivery. Our goal is to provide an unmatched
              shopping experience by offering a wide range of products that
              cater to your needs.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-blue-100 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Customer First</h3>
                <p className="text-lg">
                  We are committed to delivering the best shopping experience
                  with customer service that exceeds expectations.
                </p>
              </div>
              <div className="bg-blue-100 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Quality Assurance
                </h3>
                <p className="text-lg">
                  We ensure that all products in our store go through rigorous
                  quality checks before reaching you.
                </p>
              </div>
              <div className="bg-blue-100 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
                <p className="text-lg">
                  We are always looking for the latest trends and products to
                  offer our customers a fresh and exciting shopping experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg mb-6">
              Have questions or want to learn more? Contact us today! We're
              always here to help.
            </p>
            <a
              href="/contact"
              className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>

        <footer className="bg-blue-600 text-white py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 Shop Fusion. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;
