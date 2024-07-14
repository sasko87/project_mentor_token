import React from "react";
import ImageLibrary from "../../lib/images";
import Grid from "../Grid/Grid";
import Column from "../Grid/Column";
import "./partners.css";
import Section from "../Section/Section";

const Partners = () => {
  return (
    <Section className="partners">
      <Grid columns={12}>
        <Column size="1">
          <div className="partners-container"></div>
        </Column>
        <Column size="2">
          <div className="partners-container">{ImageLibrary.adobe}</div>
        </Column>
        <Column size="2">
          <div className="partners-container">{ImageLibrary.braze}</div>
        </Column>
        <Column size="2">
          <div className="partners-container">{ImageLibrary.hellosign}</div>
        </Column>
        <Column size="2">
          <div className="partners-container">{ImageLibrary.maze}</div>
        </Column>
        <Column size="2">
          <div className="partners-container">{ImageLibrary.ghost}</div>
        </Column>
        <Column size="1">
          <div className="partners-container"></div>
        </Column>
        <Column size="1">
          <div className="partners-container"></div>
        </Column>

        <Column size="2">
          <div className="partners-container">{ImageLibrary.attlassian}</div>
        </Column>
        <Column size="2">
          <div className="partners-container">{ImageLibrary.treehouse}</div>
        </Column>
        <Column size="2">
          <div className="partners-container">{ImageLibrary.intercom}</div>
        </Column>
        <Column size="2">
          <div className="partners-container">{ImageLibrary.opendoor}</div>
        </Column>
        <Column size="2">
          <div className="partners-container">{ImageLibrary.hubspot}</div>
        </Column>
        <Column size="1">
          <div className="partners-container"></div>
        </Column>

        <Column size="12">
          <div className=" partners-info">
            <p>More than 25+ Startups around the world trusted Mentor Token.</p>
          </div>
        </Column>
      </Grid>
    </Section>
  );
};

export default Partners;
