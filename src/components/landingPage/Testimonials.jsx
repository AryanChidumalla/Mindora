import { UserIcon } from "@heroicons/react/24/outline";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Student",
      content:
        "Mindora has been a game-changer for my anxiety. The daily tracking helps me identify triggers I never noticed before.",
    },
    {
      name: "Michael R.",
      role: "Professional",
      content:
        "The guided journaling prompts have helped me process work stress in a healthy way. I feel more balanced than ever.",
    },
    {
      name: "Emily T.",
      role: "Teacher",
      content:
        "I love how easy it is to track my moods and see patterns. The insights have been invaluable for my mental health.",
    },
  ];

  return (
    <section>
      <div className="py-24 px-12 md:px-36 lg:px-52 text-center flex flex-col gap-12 items-center bg-off-white">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold text-primary text-center">
            What Our Users Say
          </h2>
          <p className="text-xl text-primary text-center">
            Read about the experiences of people who have used our platform to
            improve their mental health.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border-2 border-primary p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <UserIcon className="w-8 h-8 mr-4" />
                <div>
                  <div className="font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
