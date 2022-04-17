import React, { useState, useEffect, useContext } from "react";
import { AppContext, history } from "../../App";
import {
  Grid,
  TextField,
} from "@material-ui/core";
import {
  FormState,
  ClientData,
  Services,
} from "../../services/Services";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import moment from "moment";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator={" "}
      decimalSeparator={"."}
      isNumericString
      prefix={props.prefix} //"$"
    />
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
    },
    container: {
      maxHeight: 440,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      "& > div": {
        flexBasis: "auto",
      },
    },
    input: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    cellStyle: {
      width: 450,
    },
  })
);


export const ClientElement = (props: any) => {
  const classes = useStyles();
  const [clientData, setClientData] = useState(new ClientData());

  const { match, formState } = props;
  var services = new Services();
  useEffect(() => {
    if (formState === FormState.EDIT || formState === FormState.READ) {
      services
        .getCard(match.params.id)
        .then((json) => setClientData(json));
    }
  }, []);

  const onSubmit = (e: any, showToast: () => void) => {
    e.preventDefault();
    if (formState === FormState.CREATE) {
      services
        .postCard(clientData)
        .then(() => {
          // showToast();
          // alert("Успешно добавлен")
          history.goBack();
        });
    } else if (formState === FormState.EDIT) {
      services
        .putCard(match.params.id, clientData)
        .then(() => {
          // alert("Успешно изменен")
          // showToast();
          history.goBack();
        });
    }
  };


  return (
    <AppContext.Consumer>
      {({ showToastCreate, showToastEdit }) => (
        <fieldset
          style={{ border: 0, padding: 0 }}
          disabled={formState === FormState.READ}
        >
          <form
            className={classes.input}
            onSubmit={(e: any) =>
              onSubmit(
                e,
                formState === FormState.CREATE ? showToastCreate : showToastEdit
              )
            }
          >
            <h2 style={{ textAlign: "center" }}>
              {formState == FormState.READ ? (
                <>Просмотр</>
              ) : formState == FormState.EDIT ? (
                <>Редактирование</>
              ) : (
                <>Добавление</>
              )}
            </h2>
            <Grid
              item
              xs={12}
              className={classes.paper}
              justify="flex-start"
              container
              spacing={3}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Фамилия"
                  value={clientData.surname || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({ ...clientData, surname: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Имя"
                  value={clientData.name || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({ ...clientData, name: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Фамилия"
                  value={clientData.patronymic || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({ ...clientData, patronymic: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Возраст"
                  value={clientData.age || ""}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({
                      ...clientData, age: parseInt(e.target.value),
                    })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Номер телефона"
                  value={clientData.phoneNumber || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({ ...clientData, phoneNumber: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Жалобы"
                  value={clientData.complaint || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({ ...clientData, complaint: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Предварительный диагноз"
                  value={clientData.advanceDiagnosis || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({ ...clientData, advanceDiagnosis: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Назначение"
                  value={clientData.appointment || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({ ...clientData, appointment: e.target.value })
                  }
                />
                <br />
                <br />
                {/* <TextField
                  variant="outlined"
                  label="Дата Создания"
                  type="date"
                  name="date"
                  value={moment(
                    clientData.creationDate,
                    moment.ISO_8601,
                    true
                  ).format("YYYY-MM-DD")}
                  InputLabelProps={{ shrink: true, required: true }}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({ ...clientData, creationDate: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  variant="outlined"
                  label="Дата начала параметра"
                  type="date"
                  name="date"
                  value={moment(
                    clientData.modificationDate,
                    moment.ISO_8601,
                    true
                  ).format("YYYY-MM-DD")}
                  InputLabelProps={{ shrink: true, required: true }}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setClientData({ ...clientData, modificationDate: e.target.value })
                  }
                /> */}
              </Grid>
            </Grid>
            <Grid container className={classes.paper} justify="center">
              <Grid item xs={8}>
                <div>
                  {formState != FormState.READ ? (
                    <input
                      type="submit"
                      value="Сохранить"
                      className="pxbutton"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Grid>
            </Grid>
          </form>
        </fieldset>
      )}
    </AppContext.Consumer>
  );
};
