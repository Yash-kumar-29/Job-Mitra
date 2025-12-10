import React from "react";
import Dot from "../../components/Dot";
import { useNavigate } from "react-router-dom";

function CompanyCard({ bgColor, company }) {
  if (!company) {
    return null;
  }

  const {
    companyName,
    companyLogo,
    jobListings = [],
    companySize,
    companySocialProfiles,
  } = company || {};

  const navigate = useNavigate();
  const redirectToDetail = (id) => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="rounded-xl border border-gray-300 p-1.5">
      <div
        className="rounded-xl border  p-2"
        style={{ backgroundColor: bgColor || "#ffffff" }}
      >
        <div className="flex gap-5 justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="h-14 w-14 border rounded-xl overflow-hidden p-px bg-white ">
              <img src={companyLogo || ""} alt="Company Logo" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-medium text-gray-800">{companyName || "Company Name"}</p>
              {companySize && (
                <span className="text-xs text-gray-500 flex gap-3 items-center ">
                  <i className="fa-solid fa-user-group"></i>
                  <p>
                    {companySize.from || 0}-{companySize.to || 0} EMPLOYEES
                  </p>
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2.5 text-gray-700">
            {companySocialProfiles?.linkedIn && (
              <a
                href={companySocialProfiles.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin hover:cursor-pointer text-lg"></i>
              </a>
            )}
            {companySocialProfiles?.twitter && (
              <a
                href={companySocialProfiles.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-square-twitter hover:cursor-pointer text-lg"></i>
              </a>
            )}
            {companySocialProfiles?.portfolioWebsite && (
              <a
                href={companySocialProfiles.portfolioWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-globe hover:cursor-pointer text-lg"></i>
              </a>
            )}
          </div>
        </div>
        {jobListings && jobListings.length > 0 && (
          <div className="flex flex-col gap-2 my-5">
            <h3 className="text-sm font-medium border-primary-500 border w-32 flex items-center justify-center rounded-md text-white bg-primary-500">
              Active Listings
            </h3>
            {jobListings?.filter(listing => listing && listing._id).map((listing, index) => (
              <div
                className="bg-gray-100 rounded-xl px-3 py-1.5 flex gap-3 items-center hover:cursor-pointer"
                key={listing._id || index}
                onClick={() => listing._id && redirectToDetail(listing._id)}
              >
                <span className="text-sm font-medium text-gray-900">
                  {listing?.title || "Job Title"}
                </span>
                <Dot />
                <span className="text-xs font-medium text-gray-600">
                  {listing?.location || "Location"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyCard;
