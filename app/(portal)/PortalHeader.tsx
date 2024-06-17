import React from "react";
import PropTypes from "prop-types";

const PortalHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <header className="bg-neutral-900 py-4 border-b border-gray-600">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-4 lg:px-6 ">
        <h1 className="text-xl sm:text-2xl lg:text-2xl  text-white">
          <div className="py-2 font-semibold">
            <span>{title}</span> |{" "}
            <span className="font-light">{subtitle}</span>
          </div>
        </h1>
      </div>
    </header>
  );
};

PortalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PortalHeader;
