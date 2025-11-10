"use client";

import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import {
  InformationCircleIcon,
  LinkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface SubdomainLinkProps {
  subdomainUrl: string;
  subdomainName: string;
  children: React.ReactNode;
  className?: string;
}

export default function SubdomainLink({
  subdomainUrl,
  subdomainName,
  children,
  className = "",
}: SubdomainLinkProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    window.open(subdomainUrl, "_blank", "noopener,noreferrer");
    setIsModalOpen(false);
  };

  return (
    <>
      <a
        href={subdomainUrl}
        onClick={handleClick}
        className={`cursor-pointer ${className}`}
      >
        {children}
      </a>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Subdomain Information"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <InformationCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  About Subdomains and SEO
                </h3>
                <p className="text-sm text-blue-800">
                  Subdomains like <strong>{subdomainName}</strong> are treated
                  as separate sites by Google, but they can still benefit the
                  main domain (pynn.ai) when properly connected.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-blue-600" />
              How to Connect Subdomains for Better SEO
            </h4>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Add Footer Links:</strong>{" "}
                  Include a &quot;Powered by Pynn AI&quot; link from each
                  subdomain back to https://pynn.ai
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Search Console:</strong>{" "}
                  Set up a Domain property for pynn.ai to see aggregated search
                  data across all subdomains
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Google Analytics:</strong>{" "}
                  Use the same GA4 Measurement ID across all subdomains with
                  cookie_domain set to &apos;auto&apos; for unified tracking
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Canonical Tags:</strong>{" "}
                  Consider adding canonical tags pointing to pynn.ai pages if
                  content overlaps
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-slate-700 mb-3">
              <strong className="text-slate-900">Note:</strong> For maximum SEO
              consolidation, you could use a reverse proxy to serve subdomains
              as subdirectories (e.g., pynn.ai/women-invest-in-women) with 301
              redirects, but this requires more technical setup.
            </p>
            <p className="text-xs text-slate-600">
              Currently, subdomains work independently but can still contribute
              to domain authority through proper linking strategies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-blue-200">
            <Button onClick={handleContinue} variant="primary" fullWidth>
              Continue to {subdomainName}
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              fullWidth
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
