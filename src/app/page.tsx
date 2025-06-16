import Navbar from '@/components/Navbar';
import AddSubject from '@/components/AddSubject';
import SubjectCards from '@/components/SubjectCards';

export default function Page() {
  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-8 flex flex-col">
        <AddSubject />
        <SubjectCards />
      </main>
      
    </div>
  );
}
