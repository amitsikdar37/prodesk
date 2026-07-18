import { CalendarDays } from 'lucide-react';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <CalendarDays size={28} />
        <h1>Class Scheduler</h1>
      </div>
    </header>
  );
};
