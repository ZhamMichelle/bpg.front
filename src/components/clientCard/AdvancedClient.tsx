import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {  ClientData,  Services,  FormState,} from "../../services/Services";
import { Button, Classes, Intent, Alert } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AppContext, history} from "../../App";
import moment from "moment";
import {  Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    formControl: {
      margin: theme.spacing(1),
    },
    tableRow: {
      "&:hover": {
        backgroundColor: "#ccc",
        cursor: "pointer",
      },
    },
  })
);

export const AdvancedClient = (props: any) => {
  const classes = useStyles();
  const [analysis, setAnalysis] = useState([] as ClientData[]);
  const {
    formState,
    filter,
  }: {
    formState: FormState;
    filter: number[];
  } = props;

  var services = new Services();
   
  useEffect(() => {
    services
      .getCards()
      .then((json) => {
        setAnalysis(json);
      })
      .catch((error) => {
        console.log(error.response);
      });
  });

  // useEffect(()=>{
  //   if((searchSector!=undefined && searchEstate==undefined ) || (searchSector==undefined && searchEstate!=undefined ) ||
  //   (searchSector!=undefined && searchEstate!=undefined )){
  //     services.getBySearchEstate(city, searchSector, searchEstate).then(json => {
  //       setAnalysis(json);
  //     });
  //   }
  // }, [searchEstate, searchSector])

  //useEffect(()=>{console.log('uniqueSector',uniqueSector)},[uniqueSector])

  const onClickItem = (elementPrim: ClientData) => {
    history.push(`/${elementPrim.id}/card`);
  };

  return (
    <AppContext.Consumer>
      {({ showToastDelete, showToastError }) => (
        <React.Fragment>
          {/* <Alert
            icon={IconNames.TRASH}
            cancelButtonText="Нет"
            confirmButtonText="Да"
            intent={Intent.DANGER}
            isOpen={wantDelete}
            onCancel={() => setWantDelete(false)}
            //onConfirm={() => onConfirm(showToastDelete)}
            onClose={() => setWantDelete(false)}
          >
            <p>
              Внимание!!!
              <br /> Вы уверены что хотите удалить ?
            </p>
          </Alert> */}
          <Grid item xs={12} className={classes.paper}>
            <table
              style={{
                width: "100%",
                textAlign: "center",
                border: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th>№</th>
                  <th>Фамилия</th>
                  <th>Имя</th>
                  <th>Отчество</th>
                  <th>Возраст</th>
                  <th>Жалоба</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {analysis.map(
                  (m, i) =>
                    !filter?.some((f) => f == m.id) && (
                      <tr
                        key={i}
                        onClick={() => onClickItem(m)}
                        className={classes.tableRow}
                      >
                        {/* <tr key={i}> */}
                        <td>{i + 1}</td>
                        <td>{m.surname}</td>
                        <td>{m.name}</td>
                        <td>{m.patronymic}</td>
                        <td>
                          {new Intl.NumberFormat("ru-RU").format(
                            m.age || 0
                          )}
                        </td>
                        <td>{m.complaint}</td>
                        <td>
                          {m.creationDate != null
                            ? moment(m.creationDate, moment.ISO_8601, true).format(
                                "DD.MM.YYYY"
                              )
                            : m.creationDate}
                        </td>
                       

                        <td style={{ width: "88px" }}>
                          <Button
                            className={Classes.MINIMAL}
                            icon={IconNames.EDIT}
                            intent={Intent.PRIMARY}
                            onClick={(e: any) => {
                              history.push(`/${m.id}/card/edit`);
                              e.stopPropagation();
                            }}
                          />
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </Grid>
        </React.Fragment>
      )}
    </AppContext.Consumer>
  );
};
