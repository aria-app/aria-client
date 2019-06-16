import getOr from 'lodash/fp/getOr';
import range from 'lodash/fp/range';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';
import Dawww from '../../../dawww';

const minVolume = -20;
const maxVolume = 0;

const styles = theme => ({
  root: {},
  deleteButton: {
    alignSelf: 'stretch',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dropdown: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  content: {
    alignItems: 'flex-start',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    marginLeft: theme.spacing(-1),
    marginRight: theme.spacing(-1),
  },
  title: {
    fontWeight: 800,
    textTransform: 'uppercase',
  },
});

class TrackEditingModal extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    onDelete: PropTypes.func,
    onDismiss: PropTypes.func,
    onVoiceSet: PropTypes.func,
    onVolumeSet: PropTypes.func,
    stagedTrack: PropTypes.object,
  };

  render() {
    return (
      <Translation>
        {t => (
          <Dialog
            className={this.props.classes.root}
            fullWidth={true}
            maxWidth="xs"
            onClose={this.props.onDismiss}
            open={this.getIsOpen()}
          >
            <DialogTitle className={this.props.classes.title}>
              {t('Edit Track')}
            </DialogTitle>
            <DialogContent className={this.props.classes.content}>
              <FormControl className={this.props.classes.dropdown}>
                <InputLabel htmlFor="voice">Voice</InputLabel>
                <Select
                  inputProps={{ name: 'voice', id: 'voice' }}
                  onChange={this.handleVoiceChange}
                  value={getOr('', 'props.stagedTrack.voice', this)}
                >
                  {Object.keys(Dawww.VOICES).map(voice => (
                    <MenuItem key={voice} value={voice}>
                      {t(voice)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={this.props.classes.dropdown}>
                <InputLabel htmlFor="volume">Volume</InputLabel>
                <Select
                  inputProps={{ name: 'volume', id: 'volume' }}
                  onChange={this.handleVolumeChange}
                  value={getOr(0, 'props.stagedTrack.volume', this)}
                >
                  {range(maxVolume, minVolume - 1).map(volume => (
                    <MenuItem key={volume} value={volume}>
                      {volume}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                className={this.props.classes.deleteButton}
                color="secondary"
                onClick={this.handleContentDeleteButtonClick}
                variant="contained"
              >
                {t('Delete')}
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </Translation>
    );
  }

  getIsOpen = () => !!this.props.stagedTrack;

  handleContentDeleteButtonClick = () => {
    this.props.onDelete(this.props.stagedTrack);
  };

  handleVoiceChange = e =>
    this.props.onVoiceSet(this.props.stagedTrack, e.target.value);

  handleVolumeChange = e =>
    this.props.onVolumeSet(this.props.stagedTrack, e.target.value);
}

export default withStyles(styles)(TrackEditingModal);
