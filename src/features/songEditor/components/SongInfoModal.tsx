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
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import { Translation } from 'react-i18next';
import Dawww from '../../../dawww';
import shared from '../../shared';

const { changeLanguage } = shared.i18n;
const getBPMRangeItem = x => ({ id: x, text: String(x) });
const bpmRangeItems = map(getBPMRangeItem, Dawww.BPM_RANGE);

const styles = (theme: Theme) =>
  createStyles({
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

export interface SongInfoModalProps extends WithStyles<typeof styles> {
  bpm?: number;
  isOpen?: boolean;
  onBPMChange?: (bpm: number) => void;
  onConfirm?: () => void;
  onReturnToDashboard?: () => void;
  onSignOut?: () => void;
}

function SongInfoModal(props: SongInfoModalProps) {
  const {
    bpm,
    classes,
    isOpen,
    onBPMChange,
    onConfirm,
    onReturnToDashboard,
    onSignOut,
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
            <FormControl className={classes.bpmDropdown}>
              <InputLabel htmlFor="bpm">BPM</InputLabel>
              <Select
                inputProps={{ name: 'bpm', id: 'bpm' }}
                onChange={handleBPMSelectChange}
                value={bpm}
              >
                {bpmRangeItems.map(bpmRangeItem => (
                  <MenuItem key={bpmRangeItem.id} value={bpmRangeItem.id}>
                    {bpmRangeItem.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={onReturnToDashboard}>
              {t('Return to Dashboard')}
            </Button>
            <Button onClick={onSignOut}>{t('Sign Out')}</Button>
            <Typography className={classes.label} variant="subtitle1">
              {t('Select Language')}
            </Typography>
            <Button onClick={() => changeLanguage('en')}>{t('English')}</Button>
            <Button onClick={() => changeLanguage('jp')}>
              {t('Japanese')}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Translation>
  );
}

export default React.memo(withStyles(styles)(SongInfoModal));
