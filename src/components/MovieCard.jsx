import React from "react";

const MovieCard = (props) => {
  return (
    <div className="overflow-hidden shadow-xl rounded-md ">
      <div className="">
        <img
          src={props.movie.Poster !== 'N/A'? props.movie.Poster: `https://via.placeholder.com/400`}
          alt={props.movie.Title}
          className="w-full max-h-[300px] object-cover hover:scale-105 cursor-pointer transition"
        />
      </div>
      <div className="p-3">
        <span className="capitalize text-sm font-semibold px-4 py-2 bg-red-600 text-white hover:bg-red-700 inline-block my-2 rounded-sm cursor-pointer">
          {props.movie.Type}
        </span>
        <h2 className="text-white text-md font-medium tracking-wider cursor-pointer">
          {props.movie.Title}
        </h2>
      </div>
    </div>
  );
};

export default MovieCard;
