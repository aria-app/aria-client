import map from 'lodash/fp/map';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import { Translation } from 'react-i18next';
import Dawww from '../../../dawww';
import shared from '../../shared';
import { ISong } from '../../shared/types';

const { changeLanguage } = shared.i18n;
const getBPMRangeItem = x => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    shareableLinkAnchor: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(0.5),
    },
    bpmDropdown: {
      marginBottom: theme.spacing(3),
    },
    content: {
      alignItems: 'flex-start',
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
    },
    title: {
      fontWeight: 800,
      textTransform: 'uppercase',
    },
    selectLanguageTitle: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    button: {
      marginBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
  });

export interface SongInfoModalProps extends WithStyles<typeof styles> {
  isOpen?: boolean;
  onBPMChange?: (bpm: number) => void;
  onConfirm?: () => void;
  onReturnToDashboard?: () => void;
  onSignOut?: () => void;
  song?: ISong;
}

function SongInfoModal(props: SongInfoModalProps) {
  const {
    classes,
    isOpen,
    onBPMChange,
    onConfirm,
    onReturnToDashboard,
    onSignOut,
    song,
  } = props;

  const handleBPMSelectChange = React.useCallback(
    e => {
      onBPMChange(e.target.value);
    },
    [onBPMChange],
  );

  return (
    <Translation>
      {t => (
        <Dialog
          className={classes.root}
          fullWidth={true}
          maxWidth="xs"
          onClose={onConfirm}
          open={isOpen}
        >
          <DialogTitle className={classes.title}>{t('Song Info')}</DialogTitle>
          <DialogContent className={classes.content}>
            <InputLabel>Shareable Link</InputLabel>
            <a
              className={classes.shareableLinkAnchor}
              href={`${process.env.PUBLIC_URL}/view-song/${song.id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              https://ariaapp.io/view-song/{song.id}
            </a>
            <FormControl className={classes.bpmDropdown}>
              <InputLabel htmlFor="bpm">BPM</InputLabel>
              <Select
                inputProps={{ name: 'bpm', id: 'bpm' }}
                onChange={handleBPMSelectChange}
                value={song.bpm}
              >
                {bpmRangeItems.map(bpmRangeItem => (
                  <MenuItem key={bpmRangeItem.id} value={bpmRangeItem.id}>
                    {bpmRangeItem.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={onReturnToDashboard}
            >
              {t('Return to Dashboard')}
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={onSignOut}
            >
              {t('Sign Out')}
            </Button>
            <InputLabel className={classes.selectLanguageTitle}>
              {t('Select Language')}
            </InputLabel>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => changeLanguage('en')}
            >
              {t('English')}
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => changeLanguage('jp')}
            >
              {t('Japanese')}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Translation>
  );
}

export default React.memo(withStyles(styles)(SongInfoModal));
