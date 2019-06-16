import Dawww from 'dawww';
import map from 'lodash/fp/map';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';
import shared from '../../shared';

const { DownloadButton } = shared.components;
const getBPMRangeItem = x => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);

const styles = theme => ({
  root: {},
  bpmDropdown: {
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
  label: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
});

class SongInfoModal extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number,
    classes: PropTypes.object,
    isOpen: PropTypes.bool,
    onBPMChange: PropTypes.func,
    onConfirm: PropTypes.func,
    onReturnToDashboard: PropTypes.func,
    onSignOut: PropTypes.func,
    song: PropTypes.object,
  };

  render() {
    return (
      <Translation>
        {t => (
          <Dialog
            className={this.props.classes.root}
            fullWidth={true}
            maxWidth="xs"
            onClose={this.props.onConfirm}
            open={this.props.isOpen}
          >
            <DialogTitle className={this.props.classes.title}>
              {t('Song Info')}
            </DialogTitle>
            <DialogContent className={this.props.classes.content}>
              <FormControl className={this.props.classes.bpmDropdown}>
                <InputLabel htmlFor="bpm">BPM</InputLabel>
                <Select
                  inputProps={{ name: 'bpm', id: 'bpm' }}
                  onChange={this.handleBPMSelectChange}
                  value={this.props.bpm}
                >
                  {bpmRangeItems.map(bpmRangeItem => (
                    <MenuItem key={bpmRangeItem.id} value={bpmRangeItem.id}>
                      {bpmRangeItem.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={this.props.onReturnToDashboard}>
                {t('Return to Dashboard')}
              </Button>
              <Button onClick={this.props.onSignOut}>{t('Sign Out')}</Button>
              <DownloadButton
                fileContents={this.getStringifiedSong()}
                filename="song.json"
              >
                {t('Download Song')}
              </DownloadButton>
              <Typography
                className={this.props.classes.label}
                variant="subtitle1"
              >
                {t('Select Language')}
              </Typography>
              <Button onClick={() => shared.i18n.changeLanguage('en')}>
                {t('English')}
              </Button>
              <Button onClick={() => shared.i18n.changeLanguage('jp')}>
                {t('Japanese')}
              </Button>
            </DialogContent>
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

export default withStyles(styles)(SongInfoModal);
