import Dawww from "dawww";
import getOr from "lodash/fp/getOr";
import isEmpty from "lodash/fp/isEmpty";
import range from "lodash/fp/range";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
import React from "react";
import { Translation } from "react-i18next";
import styled from "styled-components/macro";

const minVolume = -20;
const maxVolume = 0;

const DeleteButton = styled(Button)`
  align-self: stretch;
  margin-left: ${props => props.theme.margin.s}px;
  margin-right: ${props => props.theme.margin.s}px;
`;

const TrackEditingModalDropdown = styled(FormControl)`
  margin-bottom: ${props => props.theme.margin.m}px;
  margin-left: ${props => props.theme.margin.s}px;
`;

const TrackEditingModalContent = styled(DialogContent)`
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin-left: ${props => -props.theme.margin.s}px;
  margin-right: ${props => -props.theme.margin.s}px;
`;

const TrackEditingModalTitle = styled(DialogTitle)`
  font-weight: 800;
  text-transform: uppercase;
`;

export class TrackEditingModal extends React.PureComponent {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onVoiceSet: PropTypes.func.isRequired,
    onVolumeSet: PropTypes.func.isRequired,
    stagedTrack: PropTypes.object.isRequired
  };

  render() {
    return (
      <Translation>
        {t => (
          <Dialog
            fullWidth={true}
            maxWidth="xs"
            onClose={this.props.onDismiss}
            open={this.getIsOpen()}
          >
            <TrackEditingModalTitle>{t("Edit Track")}</TrackEditingModalTitle>
            <TrackEditingModalContent>
              <TrackEditingModalDropdown>
                <InputLabel htmlFor="voice">Voice</InputLabel>
                <Select
                  inputProps={{ name: "voice", id: "voice" }}
                  onChange={this.handleVoiceChange}
                  value={getOr("", "props.stagedTrack.voice", this)}
                >
                  {Object.keys(Dawww.VOICES).map(voice => (
                    <MenuItem key={voice} value={voice}>
                      {t(voice)}
                    </MenuItem>
                  ))}
                </Select>
              </TrackEditingModalDropdown>
              <TrackEditingModalDropdown>
                <InputLabel htmlFor="volume">Volume</InputLabel>
                <Select
                  inputProps={{ name: "volume", id: "volume" }}
                  onChange={this.handleVolumeChange}
                  value={getOr(0, "props.stagedTrack.volume", this)}
                >
                  {range(maxVolume, minVolume - 1).map(volume => (
                    <MenuItem key={volume} value={volume}>
                      {volume}
                    </MenuItem>
                  ))}
                </Select>
              </TrackEditingModalDropdown>
              <DeleteButton
                color="secondary"
                onClick={this.handleContentDeleteButtonClick}
                variant="contained"
              >
                {t("Delete")}
              </DeleteButton>
            </TrackEditingModalContent>
            </Dialog>
        )}
      </Translation>
    );
  }

  getIsOpen = () => !isEmpty(this.props.stagedTrack);

  handleContentDeleteButtonClick = () => {
    this.props.onDelete(this.props.stagedTrack);
  };

  handleVoiceChange = e =>
    this.props.onVoiceSet(this.props.stagedTrack, e.target.value);

  handleVolumeChange = e =>
    this.props.onVolumeSet(this.props.stagedTrack, e.target.value);
}
