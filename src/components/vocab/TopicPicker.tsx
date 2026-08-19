import Link from "next/link";
import type { Topic } from "@/types/vocab";

interface TopicPickerProps {
  topics: Topic[];
}

export default function TopicPicker({ topics }: TopicPickerProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">
            Vocabulary Lessons
          </p>
          <h1 className="font-display font-extrabold text-3xl mt-2">Pick a topic</h1>
        </div>

        <div className="flex flex-col gap-4">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/learn/${topic.id}`}
              className="flex items-center gap-4 bg-white rounded-3xl shadow-card border border-ink/5 p-6 hover:border-coral-300 transition-colors"
            >
              <div className="text-4xl">{topic.icon}</div>
              <div>
                <p className="font-display font-bold text-lg">{topic.label}</p>
                <p className="text-sm text-ink/50">{topic.words.length} words</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
