import { Clock, User, CalendarDays } from 'lucide-react';

export const ClassList = ({ classes }) => {
  if (classes.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <CalendarDays size={48} />
          <p>No data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Scheduled Classes</h2>
      <div className="class-list">
        {classes.map((cls) => (
          <div key={cls.id} className="class-item">
            <div className="class-info">
              <span className="class-name">{cls.name}</span>
              <div className="class-meta">
                <span>
                  <User size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {cls.instructor}
                </span>
                <span>
                  <Clock size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {cls.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
