import { CheckCircleIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { STATUS_COLORS, STATUS_ICONS } from '../config/vaccines';
import Button from './Button';

const VaccineCard = ({ vaccine, onToggle, isLoading = false }) => {
  const { label, dueDate, status, statusMessage, isCompleted, ageLabel, ageDays } = vaccine;

  return (
    <div className={`glass-card border border-white/10 border-l-4 p-4 sm:p-5 rounded-r-2xl transition-all hover:scale-[1.01] ${
      isCompleted ? 'border-l-green-500' : 'border-l-indigo-500'
    } ${isLoading ? 'opacity-70' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <span className="text-2xl sm:text-3xl">{STATUS_ICONS[status]}</span>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base sm:text-lg">{label}</h3>
          </div>

          <div className="mb-3">
            <span className="inline-flex items-center gap-2 text-xs flex-wrap">
              <span className="px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium">
                {ageLabel}
              </span>
              <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {ageDays}
              </span>
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Due Date:</span> {dueDate}
            </p>
            <p className={`text-sm font-medium inline-block px-3 py-1.5 rounded-lg ${STATUS_COLORS[status]}`}>
              {statusMessage}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          {isCompleted ? (
            <Button
              size="sm"
              variant="secondary"
              icon={isLoading ? ArrowPathIcon : ClockIcon}
              onClick={() => onToggle(vaccine.key)}
              disabled={isLoading}
              className={isLoading ? '[&>svg]:animate-spin' : ''}
            >
              {isLoading ? 'Updating...' : 'Undo'}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="success"
              icon={isLoading ? ArrowPathIcon : CheckCircleIcon}
              onClick={() => onToggle(vaccine.key)}
              disabled={isLoading}
              className={isLoading ? '[&>svg]:animate-spin' : ''}
            >
              {isLoading ? 'Updating...' : 'Mark Done'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaccineCard;
