import { FileText, Clock } from "lucide-react";

export interface ProposalOfferCardProps {
  proposal: {
    jobTitle: string;
    type: string;
    budget: number;
    milestones: number;
    status: string;
  };
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function ProposalOfferCard({
  proposal,
  onAccept,
  onDecline,
}: ProposalOfferCardProps) {
  return (
    <div className="bg-gray-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl border-2 border-purple-200 p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-indigo-200 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="pt-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {proposal.jobTitle}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-orange-300">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-500">
              {proposal.status}
            </span>
          </div>
        </div>
        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Type:</span>
            <span className="text-gray-900 font-medium">{proposal.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Total Budget:</span>
            <span className="text-gray-900 font-medium">
              $ {proposal.budget}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Milestones:</span>
            <span className="text-gray-900 font-medium">
              {proposal.milestones}
            </span>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
            onClick={onAccept}
          >
            Accept Offer
          </button>
          <button
            className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3.5 px-6 rounded-xl border-2 border-gray-200 transition-colors"
            onClick={onDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
