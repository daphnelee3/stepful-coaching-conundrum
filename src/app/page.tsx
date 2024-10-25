import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center container mx-auto min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-5xl text-red-700 font-bold mb-6">
        Stepful Coaching Calls
      </h1>
      <div className="text-lg py-8">I am a:</div>
      <div className="flex justify-center gap-6">
        <Link href="/coach">
          <Button className="bg-teal-500 hover:bg-teal-700 min-w-[120px]">
            Coach
          </Button>
        </Link>
        <Link href="/student">
          <Button className="bg-sky-500 hover:bg-sky-700 min-w-[120px]">
            Student
          </Button>
        </Link>
      </div>
    </div>
  );
}
