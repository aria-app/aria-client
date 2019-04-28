import Dawww from "dawww";
import map from "lodash/fp/map";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
import React from "react";
import { Translation } from "react-i18next";
import styled from "styled-components/macro";
import shared from "../../../shared";

const { DownloadButton, Modal } = shared.components;
const getBPMRangeItem = x => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);

const SongInfoModalBPMDropdown = styled(FormControl)`
  margin-bottom: ${props => props.theme.margin.m}px;
  margin-left: ${props => props.theme.margin.s}px;
`;

const SongInfoModalContent = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding-bottom: ${props => props.theme.margin.m}px;
  padding-left: ${props => props.theme.margin.s}px;
  padding-right: ${props => props.theme.margin.s}px;
  padding-top: ${props => props.theme.margin.m}px;
`;

const SongInfoModalLabel = styled.div`
  font-weight: 800;
  margin-left: ${props => props.theme.margin.s}px;
  margin-top: ${props => props.theme.margin.m}px;
`;

export class SongInfoModal extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onReturnToDashboard: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
    song: PropTypes.object
  };

  render() {
    return (
      <Translation>
        {t => (
          <Modal
            className="song-info-modal"
            isOpen={this.props.isOpen}
            onClickOutside={this.props.onConfirm}
            titleText={t("Song Info")}
          >
            <SongInfoModalContent className="song-info-modal__content">
              <SongInfoModalBPMDropdown>
                <InputLabel htmlFor="bpm">BPM</InputLabel>
                <Select
                  inputProps={{ name: "bpm", id: "bpm" }}
                  onChange={this.handleBPMSelectChange}
                  value={this.props.bpm}
                >
                  {bpmRangeItems.map(bpmRangeItem => (
                    <MenuItem key={bpmRangeItem.id} value={bpmRangeItem.id}>
                      {bpmRangeItem.text}
                    </MenuItem>
                  ))}
                </Select>
              </SongInfoModalBPMDropdown>
              <Button onClick={this.props.onReturnToDashboard}>
                {t("Return to Dashboard")}
              </Button>
              <Button onClick={this.props.onSignOut}>{t("Sign Out")}</Button>
              <DownloadButton
                fileContents={this.getStringifiedSong()}
                filename="song.json"
              >
                {t("Download Song")}
              </DownloadButton>
              <SongInfoModalLabel>{t("Select Language")}</SongInfoModalLabel>
              <Button onClick={() => shared.i18n.changeLanguage("en")}>
                {t("English")}
              </Button>
              <Button onClick={() => shared.i18n.changeLanguage("jp")}>
                {t("Japanese")}
              </Button>
            </SongInfoModalContent>
          </Modal>
        )}
      </Translation>
    );
  }

  getStringifiedSong = () => JSON.stringify(this.props.song);

  handleBPMSelectChange = event => {
    this.props.onBPMChange(event.target.value);
  };
}
