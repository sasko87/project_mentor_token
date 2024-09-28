import React from "react";
import ImageLibrary from "../../lib/images";
import "./partners.css";
import Section from "../Section/Section";

const Partners = () => {
  return (
    <Section className="partners">
      <div className="partners-container">
        <p className="partners-images">{ImageLibrary.adobe} </p>
        <p className="partners-images">{ImageLibrary.braze} </p>
        <p className="partners-images">{ImageLibrary.hellosign} </p>
        <p className="partners-images">{ImageLibrary.maze} </p>
        <p className="partners-images">{ImageLibrary.ghost}</p>
        <p className="partners-images">{ImageLibrary.attlassian} </p>
        <p className="partners-images">{ImageLibrary.treehouse} </p>
        <p className="partners-images">{ImageLibrary.intercom} </p>
        <p className="partners-images">{ImageLibrary.opendoor} </p>
        <p className="partners-images">{ImageLibrary.hubspot} </p>
      </div>
      <div className="partners-info">
        <p>
          More than 25+ Startups around the <br />
          world trusted Mentor Token.
        </p>
      </div>
    </Section>
  );
};

export default Partners;
