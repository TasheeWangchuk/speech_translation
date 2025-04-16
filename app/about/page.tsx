export default function About() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to our Bidirectional Translation System, a cutting-edge platform designed to break down language barriers between English and Dzongkha. Our system leverages advanced machine learning algorithms to provide accurate and natural translations while preserving the cultural nuances of both languages.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Our mission is to facilitate seamless communication between English and Dzongkha speakers, promoting cultural exchange and understanding. We strive to provide an accessible and user-friendly translation service that maintains the authenticity of both languages.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Bidirectional translation between English and Dzongkha</li>
              <li>Audio input and output support</li>
              <li>Real-time translation capabilities</li>
              <li>High accuracy and natural language processing</li>
              <li>User-friendly interface</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology</h2>
            <p className="text-gray-600">
              Our translation system uses state-of-the-art natural language processing and machine learning technologies to ensure accurate translations. We continuously improve our algorithms through user feedback and data analysis to provide the best possible translation experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}