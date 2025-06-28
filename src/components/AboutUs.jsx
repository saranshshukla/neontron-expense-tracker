import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-cyan-400 p-8 font-mono">
      <div className="max-w-5xl mx-auto pt-24">
        <h1 className="text-5xl font-bold mb-6">About Tron Finance</h1>

        <p className="text-lg mb-6 leading-relaxed text-cyan-300">
          Hello there! Welcome to <span className="font-semibold text-cyan-500">Tron Finance</span> - a place where managing money doesn't have to feel boring.
          <br /><br />
          We have some super useful tools to help you keep track of your money and plan accordingly:
        </p>

        <ul className="list-disc list-inside text-cyan-300 mb-6 ml-6">
          <li> Expense Tracker</li>
          <li> Savings Calculator</li>
          <li> SIP Calculator</li>
          <li> Loan EMI Calculator</li>
          <li> Retirement Planner</li>
        </ul>

        <p className="text-lg mb-8 leading-relaxed text-cyan-300">
          For the dessert, you will find practical articles and hand-picked books from some of the sharpest minds in finance. Whether you're just getting started or already on your Wall Street journey, Tron Finance is here for you.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Let’s Connect</h2>

        <div className="flex space-x-10 mb-10">
          <a
            href="https://github.com/saranshshukla"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-white text-4xl transition-transform transform hover:scale-110 hover:-translate-y-1"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/saransh-shukla-036914247"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-white text-4xl transition-transform transform hover:scale-110 hover:-translate-y-1"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:takshak1889@example.com"
            className="text-cyan-400 hover:text-white text-4xl transition-transform transform hover:scale-110 hover:-translate-y-1"
          >
            <FaEnvelope />
          </a>
        </div>

        <footer className="text-cyan-600 text-sm mt-10">
          © {new Date().getFullYear()} Tron Finance. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
