import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const SynonymsPage = () => {
  const [equivalentMapping, setEquivalentMapping] = useState(true);
  const { register, handleSubmit, watch, control, errors, reset, setValue } =
    useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="text-4xl text-center my-8">Synonyms</div>

      {/* <div className="flex justify-center items-center">
        <div className="font-body text-2xl">Equivalent</div>
        <label htmlFor="toggle-switch">
          <input
            type="checkbox"
            id="toggle-switch"
            className="cursor-pointer mx-10 h-16 w-32 rounded-full appearance-none bg-gray-800 border-4 border-black checked:bg-gray-800 transition duration-200 relative"
            checked={equivalentMapping}
            onChange={() => setEquivalentMapping(!equivalentMapping)}
          />
        </label>
        <div className="font-body text-2xl">Explicit</div>
      </div> */}

      <form className="flex my-24 ml-10" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="word"
          name="word"
          {...register("word", { required: true })}
          className="text-2xl"
        />

        {/* <Controller */}
        <div className="flex justify-center items-center">
          <div className="font-body text-2xl">Equivalent</div>
          <label htmlFor="toggle-switch">
            <input
              type="checkbox"
              name="mapping"
              id="toggle-switch"
              defaultChecked={true}
              className="cursor-pointer mx-10 h-16 w-32 rounded-full appearance-none bg-gray-800 border-4 border-black checked:bg-gray-800 transition duration-200 relative"
              onChange={() => setEquivalentMapping(!equivalentMapping)}
              {...register("mapping")}
            />
          </label>
          <div className="font-body text-2xl">Explicit</div>
        </div>

        <input
          className="px-8 py-4 bg-indigo-800 text-white rounded"
          type="submit"
        />
      </form>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </>
  );
};

export default SynonymsPage;
