import Dawww from "dawww";
import map from "lodash/fp/map";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import { Translation } from "react-i18next";
import styled from "styled-components/macro";
import shared from "../../shared";

const { DownloadButton } = shared.components;
const getBPMRangeItem = x => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);

const SongInfoModalBPMDropdown = styled(FormControl)(props => ({
  marginBottom: props.theme.margin.m,
  marginLeft: props.theme.margin.s,
}));

const SongInfoModalContent = styled(DialogContent)(props => ({
  alignItems: "flex-start",
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  marginLeft: props.theme.margin.s * -1,
  marginRight: props.theme.margin.s * -1,
}));

const SongInfoModalTitle = styled(DialogTitle)({
  fontWeight: 800,
  textTransform: "uppercase",
});

const SongInfoModalLabel = styled(Typography)(props => ({
  marginLeft: props.theme.margin.s,
  marginTop: props.theme.margin.m,
}));

export default class SongInfoModal extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onReturnToDashboard: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
    song: PropTypes.object,
  };

  render() {
    return (
      <Translation>
        {t => (
          <Dialog
            fullWidth={true}
            maxWidth="xs"
            onClose={this.props.onConfirm}
            open={this.props.isOpen}
          >
            <SongInfoModalTitle>{t("Song Info")}</SongInfoModalTitle>
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
              <SongInfoModalLabel variant="subtitle1">
                {t("Select Language")}
              </SongInfoModalLabel>
              <Button onClick={() => shared.i18n.changeLanguage("en")}>
                {t("English")}
              </Button>
              <Button onClick={() => shared.i18n.changeLanguage("jp")}>
                {t("Japanese")}
              </Button>
            </SongInfoModalContent>
          </Dialog>
        )}
      </Translation>
    );
  }

  getStringifiedSong = () => JSON.stringify(this.props.song);

  handleBPMSelectChange = event => {
    this.props.onBPMChange(event.target.value);
  };
}
