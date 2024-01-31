/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "react-modal";

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    movieName: "",
  });

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setShowDetails(data));
  }, [id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookTicket = () => {
    if (showDetails) {
      setBookingDetails({
        ...bookingDetails,
        movieName: showDetails.name,
      });
      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

      console.log("Ticket booked successfully!");

      handleCloseModal();
    }
  };

  return (
    <div>
      {showDetails && (
        <div>
          <h1>{showDetails.name}</h1>
          <p>
            {showDetails.summary && showDetails.summary.replace(/<[^>]*>/g, "")}
          </p>
          <button onClick={handleOpenModal}>
            Book Ticket
          </button>
          <Link to="/">
            Back to Home
          </Link>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Book Ticket Modal"
          >
            <h2>Book Ticket</h2>
            <form>
              <div className="form-group">
                <label htmlFor="moviename">
                  Movie Name:
                  <input
                    type="text"
                    name="movieName"
                    value={showDetails.name} 
                    readOnly
                  />
                </label>
                
                <label>
                  Additional Detail:
                  <textarea
                    name="additionalDetail"
                    value={`Schedule Time: ${
                      showDetails.schedule.time
                    }\nDays: ${showDetails.schedule.days.join(", ")}\nRating: ${
                      showDetails.rating.average
                    }`}
                    readOnly
                  />
                </label>
                <button type="button" onClick={handleBookTicket}>
                  Confirm Booking
                </button>
              </div>
            </form>
            <button onClick={handleCloseModal}>Close</button>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
