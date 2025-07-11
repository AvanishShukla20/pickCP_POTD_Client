import React from 'react';
import Avanish from "../assets/Avanish.png"
export default function Team() {
  return (
    <section className="bg-white ">
      <div className="container px-6 py-10 mx-auto">
        <div className="xl:flex xl:items-center justify-center xl:-mx-4">
          <div className="xl:w-1/2 xl:mx-4">
            <h1 className="text-3xl font-semibold text-blue-800 capitalize lg:text-4xl ">
              Developer
            </h1>
            <p className="max-w-2xl mt-4 text-gray-500 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              incidunt ex placeat modi magni quia error alias, adipisci rem
              similique, at omnis eligendi optio eos harum.
            </p>
          </div>

          <div className="">
            <div>
              <img
                className="object-cover rounded-xl h-64"
                src={Avanish}
                alt="Avanish"
              />
              <h1 className="mt-4 text-2xl font-semibold text-blue-800 capitalize ">
                Avanish Shukla
              </h1>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
