'use client';

interface Feature {
  id: string;
  heading: string;
  description: string;
  items: string[];
  emoji: string;
  url: string;
}

const features: Feature[] = [
  {
    id: 'sports',
    heading: '⚽ Sports',
    description: 'Join sports teams and compete',
    emoji: '⚽',
    items: ['Tennis', 'Basketball', 'Football', 'Volleyball', 'Pool', 'Gym'],
    url: '/sports'
  },
  {
    id: 'competitions',
    heading: '🏆 Competitions',
    description: 'Join teams and compete against others in your school',
    emoji: '🏆',
    items: ['CTF (Capture The Flag)', 'Competitive Programming'],
    url: '/competitions'
  }
];

export default function BookingFeatures() {
  return (
    <section className="py-16 border-t border-emerald-500/20 bg-gradient-to-b from-slate-950 to-black">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center lg:text-left bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">What's Available</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 rounded-lg border border-emerald-500/30 bg-slate-900/50 hover:border-emerald-400/60 hover:bg-emerald-500/10 transition"
            >
              <h3 className="text-xl font-bold mb-4 text-emerald-400">
                {feature.heading}
              </h3>
              
              <ul className="space-y-2 text-gray-300 mb-4">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}