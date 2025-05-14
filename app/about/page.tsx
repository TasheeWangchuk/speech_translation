import UserProfileCard from "@/components/ui/UserProfileCard";

export default function About() {
  return (
    <div
      className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-orange-50 via-white to-yellow-50"
      style={{
        backgroundImage: "url('/Artboard.png')",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div
          className="rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 lg:p-8"
          style={{
            backgroundImage: "url('/Artboard.png')",
          }}
        >
          {/* Limitations Section */}
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Limitations
          </h1>
          <div className="prose max-w-none text-sm sm:text-base">
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <span className="font-medium">
                  1. Limited Language Resources:
                </span>{" "}
                Dzongkha, being a low-resource language, lacks large,
                high-quality corpora for speech and text. This scarcity hampers
                the training of robust models for automatic speech recognition
                (ASR), machine translation (MT), and text-to-speech (TTS)
                synthesis.
              </li>
              <li>
                <span className="font-medium">
                  2. Dialectal and Pronunciation Variability:
                </span>{" "}
                Regional variations and differences in speaker pronunciation
                introduce inconsistency in speech recognition, often leading to
                mistranslations or recognition errors.
              </li>
              <li>
                <span className="font-medium">3. ASR Accuracy Challenges:</span>{" "}
                Due to tonal variations, homophones, and limited annotated data,
                the ASR system may struggle with word boundaries, misrecognizing
                common or similar-sounding terms.
              </li>
              <li>
                <span className="font-medium">
                  4. Machine Translation Limitations:
                </span>{" "}
                Translation models for Dzongkha often lack contextual awareness,
                resulting in literal or grammatically incorrect outputs,
                especially when translating complex sentences or idiomatic
                expressions.
              </li>
              <li>
                <span className="font-medium">
                  5. TTS Naturalness and Expressiveness:
                </span>{" "}
                Generating natural, expressive speech in Dzongkha remains
                challenging. Synthesized voices may sound robotic, flat, or fail
                to capture the emotional tone of the original input.
              </li>
              <li>
                <span className="font-medium">
                  6. Real-Time Performance Constraints:
                </span>{" "}
                Speech-to-speech translation requires real-time processing
                across multiple modules (ASR → MT → TTS), which may introduce
                latency and affect user experience—especially on low-power
                devices.
              </li>
              <li>
                <span className="font-medium">
                  7. Cultural and Contextual Misinterpretation:
                </span>{" "}
                Some cultural nuances or context-specific expressions in
                Dzongkha do not have direct equivalents in other languages,
                potentially leading to mistranslations or misunderstandings.
              </li>
              <li>
                <span className="font-medium">
                  8. Code-Switching and Mixed Language Input:
                </span>{" "}
                Speakers often mix Dzongkha with English or other regional
                languages. Handling such inputs accurately is complex and often
                unsupported by monolingual or bilingual models.
              </li>
            </ul>
          </div>

          {/* Developers Section */}
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 mt-8 sm:mt-10">
            Developers
          </h1>
          <div className="grid grid-cols-1 mt-10 gap-4 sm:gap-6">
            {/* First row - Only Karma's card centered */}
            <div className="flex justify-center">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <UserProfileCard
                  name="Karma Wangchuk (Guide)"
                  title="Associate Lecturer at the Information Technology Department, College of Science and Technology."
                  imageSrc="/karma.png"
                  twitterUrl="https://twitter.com/alexjohnson"
                  linkedinUrl="https://linkedin.com/in/alexjohnson"
                  githubUrl="https://github.com/alexjohnson"
                  instagramUrl="https://instagram.com/alexjohnson"
                />
              </div>
            </div>

            {/* Second row - Four student cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <UserProfileCard
                name="Tshering Norphel"
                title="Student at the College of Science and Technology(2021-2025)."
                imageSrc="/norphel.jpeg/"
                twitterUrl="https://twitter.com/alexjohnson"
                linkedinUrl="https://linkedin.com/in/alexjohnson"
                githubUrl="https://github.com/alexjohnson"
                instagramUrl="https://instagram.com/alexjohnson"
              />
              <UserProfileCard
                name="Sumit Adhikari"
                title="Student at the College of Science and Technology(2021-2025)."
                imageSrc="/sumit.png"
                twitterUrl="https://twitter.com/alexjohnson"
                linkedinUrl="https://linkedin.com/in/alexjohnson"
                githubUrl="https://github.com/alexjohnson"
                instagramUrl="https://instagram.com/alexjohnson"
              />
              <UserProfileCard
                name="Dorji Phuntsho"
                title="Student at the College of Science and Technology(2021-2025)."
                imageSrc="/dorji.png/"
                twitterUrl="https://twitter.com/alexjohnson"
                linkedinUrl="https://linkedin.com/in/alexjohnson"
                githubUrl="https://github.com/alexjohnson"
                instagramUrl="https://instagram.com/alexjohnson"
              />
              <UserProfileCard
                name="Tashi Wangchuk"
                title="Student at the College of Science and Technology(2021-2025)."
                imageSrc="/tashi.png/"
                twitterUrl="https://twitter.com/alexjohnson"
                linkedinUrl="https://linkedin.com/in/alexjohnson"
                githubUrl="https://github.com/alexjohnson"
                instagramUrl="https://instagram.com/alexjohnson"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
