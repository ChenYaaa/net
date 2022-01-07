import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import "./favourListItem.scss";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const FavourListItem = ({ item }) => {
  // console.log(item)
  const [date, setDate] = useState("");
  function rTime(date) {
    var json_date = new Date(date).toJSON();
    let newdate = new Date(new Date(json_date) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
    setDate(newdate);
  }
  useEffect(() => {
    rTime(item.postTime);
  }, [item.postTime]);
  return (
    <div className="favourListItem">
      <div>{item._id}</div>
      <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={item.img} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {item.imgTitle} <span></span>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {item.desc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  add time：{date}
                </Typography>
              </Grid>
              <Grid item>
                {/* <Typography variant="subtitle1" component="div">
                XXXX
              </Typography> */}
              </Grid>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default FavourListItem;
