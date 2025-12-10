import React, { useEffect, useState } from "react";
import CompanyCard from "../components/CompaniesPage/CompanyCard";
import { contentService } from "../services/contentService";
import DisclaimerBanner from "../components/Common/DisclaimerBanner";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await contentService.getCompanies();
      setCompanies(res || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setError("Failed to load companies. Please try again later.");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-16 px-10">
        <DisclaimerBanner />
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 px-10">
        <DisclaimerBanner />
        <div className="flex justify-center items-center h-64">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 px-10">
      <DisclaimerBanner />
      <div>
        <div className="flex gap-5 items-center mb-5">
          <h2 className="text-2xl font-medium ">Top companies hiring now</h2>
          <div className="rounded-3xl border shadow-sm py-1 px-3 border-gray-400">
            {companies.length}
          </div>
        </div>
        {companies.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">No companies found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {companies?.map((company) => (
              <CompanyCard 
                key={company._id || company.userProfile?._id || Math.random()} 
                company={company.userProfile} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompaniesPage;
