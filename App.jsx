import { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://irwlygrdrxqorhicfkam.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlyd2x5Z3Jkcnhxb3JoaWNma2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTY1MDYsImV4cCI6MjA5Nzk3MjUwNn0.jMea4xHsnzLphhcZtchMJBiI8CFDUn9TzWQAiHV4x4M"
);

const PALETTE = [
  "#f4c2c2","#bfe3c9","#c7d4f0","#e3c9ee",
  "#cfe9e2","#f6dba3","#cfe3ee","#e8d2bb",
];

const LOGO_SRC = "data:image/png;base64,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";

const STATUS = {
  available:   { label: "Available",    color: "#2f9e58", bg: "#e7f5ec" },
  reserved:    { label: "Reserved",     color: "#2f6fc8", bg: "#e8eefb" },
  rented:      { label: "Out / Rented", color: "#c83f3f", bg: "#fbe9e9" },
  maintenance: { label: "Maintenance",  color: "#c8941f", bg: "#fbf1de" },
};

const SEED = [
  { name: "48' Combo TA — Hatzic", yard: "Hatzic", location: "Hatzic Yard", units: ["45991"] },
  { name: "53' TA Dry", yard: "Hatzic", location: "Hatzic Yard", units: ["57101","57203","59771","68376","69098","69101","69110","72226","72490","77717","79447","80158","81987","92446","92496","92498","94450","94746","94747"] },
  { name: "53' Tri Flat — Hatzic", yard: "Hatzic", location: "Hatzic Yard", units: ["57413","65447","82368","82858","85386","89171","95872","95873"] },
  { name: "53' Tri Dryvan", yard: "Hatzic", location: "Hatzic Yard", units: ["50487","83478","97369"] },
  { name: "53' TA Reefer", yard: "Hatzic", location: "Hatzic Yard", units: ["65094","66687","69068","71898","78121","83567","83569","89706","92170","92254"] },
  { name: "53' TA Flatdeck Alum", yard: "Hatzic", location: "Hatzic Yard", units: [] },
  { name: "53' Step Deck — Hatzic", yard: "Hatzic", location: "Hatzic Yard", units: [] },
  { name: "Flat Air Ride", yard: "Hatzic", location: "Hatzic Yard", units: ["61992"] },
  { name: "48' Combo TA", yard: "Mission", location: "", units: ["47418"] },
  { name: "53' TA Alum FD", yard: "Mission", location: "", units: ["91941","91942","92271","92273"] },
  { name: "53' Tri Flat", yard: "Mission", location: "", units: ["57464","60916","61088","61120","63921","63944","65373","65410","65442","66778","66779","66781","66793","82060","82070","82071","82360","82365","82369","82370","82372","82916","82923","82943","82948","82955","85390","87598","89170","89182","90682","91677","91679","98266"] },
  { name: "53' Step Deck", yard: "Mission", location: "", units: ["63988","76798","81726","90698","98258","98259","98260","98264","98265"] },
  { name: "53' Tri Step C (Beavertail)", yard: "Mission", location: "", units: ["90536"] },
  { name: "Trombone DD (Double Drop)", yard: "Mission", location: "", units: ["92741"] },
  { name: "Super B Flatdeck", yard: "Mission", location: "", units: ["65319","78882","79995","80003","88490","92870","97221"] },
  { name: "Trombone Step", yard: "Mission", location: "", units: ["65720"] },
  { name: "Trombone Flat", yard: "Mission", location: "", units: ["58130"] },
  { name: "53' TA Heater", yard: "Mission", location: "", units: ["55242","87292"] },
  { name: "TRA 53' Reefer", yard: "Mission", location: "", units: ["69386","70053","70054","70564","70651","71448","71470","71479","71480","71491","71861","77038","77202","77206","80218","82835","82838","83570","92171","92255"] },
  { name: "53' Tri Reefer", yard: "Mission", location: "", units: ["79019","89091","92500"] },
  { name: "Shunt Truck", yard: "Mission", location: "", units: ["0232"] },
  { name: "53' Tri Dryvan", yard: "Mission", location: "", units: ["40661","84398","94580","95488","95490"] },
  { name: "36' TA Dry Lift", yard: "Mission", location: "", units: ["97605"] },
  { name: "53' TA Van / Storage", yard: "Mission", location: "", units: ["17592","28558","41507","45946","49728","57129","63396","66596","68381","69104","70075","77712","80112","92089","92499","94460"] },
];

const YARDS = ["Mission", "Hatzic"];

const GREEN_UNITS = new Set([
  "47418","91941","91942","92271","92273",
  "57464","65410","82370","90682","91677",
  "92741","58130","40661",
]);

const ENRICHMENT_DATA = {"0232":{"make":"Ottawa","year":"2007","serial":"11VF813A27A000069","cviExpiry":"","plate":""},"91677":{"make":"Fontaine","year":"2023","serial":"13N1533C0P1562493","cviExpiry":"2026-12-31","plate":"AB 6VY640"},"57464":{"make":"Fontaine","year":"2013","serial":"13N1533C2D1558117","cviExpiry":"2026-08-31","plate":"AB 5XX647"},"65410":{"make":"Fontaine","year":"2015","serial":"13N1533C4F1571194","cviExpiry":"2026-08-31","plate":"AB 4WY480"},"58130":{"make":"Fontaine","year":"2013","serial":"13N4533C9D3560576","cviExpiry":"2026-08-31","plate":"AB 4MA847"},"83570":{"make":"Utility","year":"2021","serial":"1UYVS2539M2372415","cviExpiry":"2026-10-31","plate":"AB 6TF792"},"40661":{"make":"Utility","year":"2008","serial":"1UYVS35318G361603","cviExpiry":"2027-02-28","plate":"BC 77841C"},"97221":{"make":"Doepker","year":"2020","serial":"2DEHBF923L4039062","cviExpiry":"2027-04-30","plate":"BC 57021L"},"65319":{"make":"Raja","year":"2015","serial":"2R9CS4220FD144443","cviExpiry":"2026-09-30","plate":"BC 39421K"},"82370":{"make":"Renn","year":"2021","serial":"2SFNC0465M1049978","cviExpiry":"2026-08-31","plate":"AB 5XX651"},"92870":{"make":"Renn","year":"2024","serial":"2SFNC6361R1088160","cviExpiry":"2027-05-31","plate":"BC 59236K"},"88490":{"make":"Renn","year":"2023","serial":"2SFNC6369P1083205","cviExpiry":"2026-06-30","plate":"BC 95407K"},"78882":{"make":"Renn","year":"2020","serial":"2SFNM3696L1047810","cviExpiry":"2027-03-31","plate":"AB 5XA556"},"79995":{"make":"Renn","year":"2019","serial":"2SFNM369XK1043290","cviExpiry":"2026-10-31","plate":"AB 6FA240"},"80003":{"make":"Renn","year":"2020","serial":"2SFNM369XL1047034","cviExpiry":"2026-10-31","plate":"AB 5XT644"},"47418":{"make":"Wilson","year":"2010","serial":"4WWBGB6N7AN614629","cviExpiry":"2026-11-30","plate":"BC 05372D"},"61992":{"make":"Fontaine","year":"2014","serial":"57J128206E3561305","cviExpiry":"2026-07-31","plate":"AB 4SN660"},"92741":{"make":"Fontaine","year":"2024","serial":"57JM05108R35A3278","cviExpiry":"2027-05-31","plate":"AB 6PY524"},"92271":{"make":"Mac","year":"2023","serial":"5MAPA5325PH066716","cviExpiry":"2027-04-30","plate":"BC 19652L"},"91941":{"make":"Mac","year":"2024","serial":"5MAPA5325RH076911","cviExpiry":"2026-07-31","plate":"BC 29080L"},"91942":{"make":"Mac","year":"2024","serial":"5MAPA5327RH076912","cviExpiry":"2026-07-31","plate":"BC 29079L"},"92273":{"make":"Mac","year":"2023","serial":"5MAPA5329PH066718","cviExpiry":"2027-04-30","plate":"BC 19645L"},"28558":{"make":"Utility","year":"2005","serial":"679813","cviExpiry":"","plate":""},"41507":{"make":"Wabash","year":"1999","serial":"580806","cviExpiry":"","plate":""},"45946":{"make":"Utility","year":"2009","serial":"689612","cviExpiry":"","plate":""},"45991":{"make":"Wilson","year":"2009","serial":"614150","cviExpiry":"","plate":""},"49728":{"make":"Utility","year":"2005","serial":"520960","cviExpiry":"","plate":""},"50487":{"make":"Utility","year":"2011","serial":"019303","cviExpiry":"","plate":""},"55242":{"make":"Utility","year":"2012","serial":"393002","cviExpiry":"","plate":""},"57101":{"make":"Utility","year":"2013","serial":"538547","cviExpiry":"","plate":""},"57129":{"make":"Utility","year":"2013","serial":"583575","cviExpiry":"","plate":""},"57203":{"make":"Utility","year":"2013","serial":"538649","cviExpiry":"","plate":""},"57413":{"make":"Fontaine","year":"2013","serial":"558066","cviExpiry":"","plate":""},"59771":{"make":"Utility","year":"2005","serial":"679802","cviExpiry":"","plate":""},"61120":{"make":"Fontaine","year":"2014","serial":"564763","cviExpiry":"","plate":""},"60916":{"make":"Fontaine","year":"2014","serial":"564499","cviExpiry":"","plate":""},"61088":{"make":"Fontaine","year":"2014","serial":"564869","cviExpiry":"","plate":""},"63396":{"make":"Utility","year":"2015","serial":"091231","cviExpiry":"","plate":""},"63921":{"make":"Fontaine","year":"2015","serial":"568986","cviExpiry":"","plate":""},"63944":{"make":"Fontaine","year":"2015","serial":"569009","cviExpiry":"","plate":""},"63988":{"make":"Fontaine","year":"2015","serial":"569053","cviExpiry":"","plate":""},"65094":{"make":"Utility","year":"2015","serial":"285138","cviExpiry":"","plate":""},"65442":{"make":"Fontaine","year":"2015","serial":"571226","cviExpiry":"","plate":""},"65447":{"make":"Fontaine","year":"2015","serial":"571231","cviExpiry":"","plate":""},"65373":{"make":"Fontaine","year":"2015","serial":"571157","cviExpiry":"","plate":""},"65720":{"make":"Fontaine","year":"2015","serial":"562170","cviExpiry":"","plate":""},"66596":{"make":"Utility","year":"2016","serial":"472348","cviExpiry":"","plate":""},"66687":{"make":"Utility","year":"2016","serial":"464839","cviExpiry":"","plate":""},"66778":{"make":"Fontaine","year":"2016","serial":"512384","cviExpiry":"","plate":""},"66779":{"make":"Fontaine","year":"2016","serial":"512385","cviExpiry":"","plate":""},"66781":{"make":"Fontaine","year":"2016","serial":"512387","cviExpiry":"","plate":""},"66793":{"make":"Fontaine","year":"2016","serial":"512399","cviExpiry":"","plate":""},"68376":{"make":"Utility","year":"2016","serial":"704815","cviExpiry":"","plate":""},"68381":{"make":"Utility","year":"2016","serial":"704820","cviExpiry":"","plate":""},"69068":{"make":"Utility","year":"2016","serial":"822203","cviExpiry":"","plate":""},"69098":{"make":"Vanguard","year":"2014","serial":"400608","cviExpiry":"","plate":""},"69101":{"make":"Vanguard","year":"2014","serial":"400611","cviExpiry":"","plate":""},"69104":{"make":"Vanguard","year":"2013","serial":"307942","cviExpiry":"","plate":""},"69110":{"make":"Vanguard","year":"2013","serial":"307948","cviExpiry":"","plate":""},"69386":{"make":"Utility","year":"2017","serial":"882015","cviExpiry":"","plate":""},"70053":{"make":"Utility","year":"2017","serial":"978813","cviExpiry":"","plate":""},"70054":{"make":"Utility","year":"2017","serial":"978814","cviExpiry":"","plate":""},"70075":{"make":"Utility","year":"2008","serial":"361516","cviExpiry":"","plate":""},"70564":{"make":"Utility","year":"2018","serial":"039223","cviExpiry":"","plate":""},"71448":{"make":"Utility","year":"2017","serial":"978825","cviExpiry":"","plate":""},"70651":{"make":"Utility","year":"2017","serial":"015104","cviExpiry":"","plate":""},"71470":{"make":"Utility","year":"2017","serial":"978847","cviExpiry":"","plate":""},"71479":{"make":"Utility","year":"2017","serial":"978856","cviExpiry":"","plate":""},"71480":{"make":"Utility","year":"2017","serial":"978857","cviExpiry":"","plate":""},"71491":{"make":"Utility","year":"2017","serial":"978868","cviExpiry":"","plate":""},"71861":{"make":"Utility","year":"2017","serial":"941609","cviExpiry":"","plate":""},"71898":{"make":"Utility","year":"2017","serial":"941646","cviExpiry":"","plate":""},"72226":{"make":"Utility","year":"2017","serial":"122407","cviExpiry":"","plate":""},"72490":{"make":"Utility","year":"2016","serial":"472361","cviExpiry":"","plate":""},"76798":{"make":"Fontaine","year":"2019","serial":"534910","cviExpiry":"","plate":""},"77038":{"make":"Utility","year":"2019","serial":"718416","cviExpiry":"","plate":""},"77202":{"make":"Utility","year":"2019","serial":"730619","cviExpiry":"","plate":""},"77206":{"make":"Utility","year":"2019","serial":"730623","cviExpiry":"","plate":""},"77712":{"make":"Strick","year":"2009","serial":"523055","cviExpiry":"","plate":""},"77717":{"make":"Strick","year":"2009","serial":"523059","cviExpiry":"","plate":""},"78121":{"make":"Utility","year":"2020","serial":"804612","cviExpiry":"","plate":""},"79019":{"make":"Utility","year":"2020","serial":"879408","cviExpiry":"","plate":""},"79447":{"make":"Utility","year":"2020","serial":"912501","cviExpiry":"","plate":""},"80158":{"make":"Utility","year":"2021","serial":"027102","cviExpiry":"","plate":""},"80112":{"make":"Utility","year":"2020","serial":"026911","cviExpiry":"","plate":""},"80218":{"make":"Utility","year":"2020","serial":"013647","cviExpiry":"","plate":""},"81726":{"make":"Fontaine","year":"2020","serial":"543562","cviExpiry":"","plate":""},"81987":{"make":"Tycrop","year":"2007","serial":"016189","cviExpiry":"","plate":""},"82060":{"make":"Renn","year":"2021","serial":"049448","cviExpiry":"","plate":""},"82070":{"make":"Renn","year":"2020","serial":"049717","cviExpiry":"","plate":""},"82071":{"make":"Renn","year":"2020","serial":"049718","cviExpiry":"","plate":""},"82360":{"make":"Renn","year":"2021","serial":"049757","cviExpiry":"","plate":""},"82365":{"make":"Renn","year":"2021","serial":"049963","cviExpiry":"","plate":""},"82368":{"make":"Renn","year":"2021","serial":"049966","cviExpiry":"","plate":""},"82369":{"make":"Renn","year":"2021","serial":"049967","cviExpiry":"","plate":""},"82372":{"make":"Renn","year":"2021","serial":"049980","cviExpiry":"","plate":""},"82835":{"make":"Wabash","year":"2017","serial":"963014","cviExpiry":"","plate":""},"82838":{"make":"Wabash","year":"2017","serial":"963019","cviExpiry":"","plate":""},"82858":{"make":"Fontaine","year":"2021","serial":"545037","cviExpiry":"","plate":""},"82916":{"make":"Renn","year":"2021","serial":"050051","cviExpiry":"","plate":""},"82923":{"make":"Renn","year":"2021","serial":"050444","cviExpiry":"","plate":""},"82943":{"make":"Renn","year":"2021","serial":"051053","cviExpiry":"","plate":""},"82948":{"make":"Renn","year":"2021","serial":"051365","cviExpiry":"","plate":""},"82955":{"make":"Renn","year":"2021","serial":"051531","cviExpiry":"","plate":""},"83478":{"make":"Utility","year":"2021","serial":"367112","cviExpiry":"","plate":""},"83567":{"make":"Utility","year":"2021","serial":"372412","cviExpiry":"","plate":""},"83569":{"make":"Utility","year":"2021","serial":"372414","cviExpiry":"","plate":""},"84398":{"make":"Utility","year":"2022","serial":"481111","cviExpiry":"","plate":""},"85386":{"make":"Fontaine","year":"2022","serial":"547300","cviExpiry":"","plate":""},"85390":{"make":"Fontaine","year":"2022","serial":"547304","cviExpiry":"","plate":""},"87292":{"make":"Manac","year":"2023","serial":"209696","cviExpiry":"","plate":""},"87598":{"make":"Fontaine","year":"2022","serial":"549788","cviExpiry":"","plate":""},"89091":{"make":"Utility","year":"2013","serial":"711102","cviExpiry":"","plate":""},"89170":{"make":"Fontaine","year":"2023","serial":"551975","cviExpiry":"","plate":""},"89171":{"make":"Fontaine","year":"2023","serial":"551976","cviExpiry":"","plate":""},"89182":{"make":"Fontaine","year":"2023","serial":"551987","cviExpiry":"","plate":""},"89706":{"make":"Utility","year":"2023","serial":"809027","cviExpiry":"","plate":""},"90536":{"make":"Felling","year":"2024","serial":"017686","cviExpiry":"","plate":""},"90682":{"make":"Fontaine","year":"2023","serial":"561281","cviExpiry":"","plate":""},"90698":{"make":"Fontaine","year":"2023","serial":"561297","cviExpiry":"","plate":""},"91679":{"make":"Fontaine","year":"2023","serial":"562495","cviExpiry":"","plate":""},"92089":{"make":"Utility","year":"2024","serial":"014326","cviExpiry":"","plate":""},"92170":{"make":"Utility","year":"2024","serial":"014412","cviExpiry":"","plate":""},"92171":{"make":"Utility","year":"2024","serial":"014413","cviExpiry":"","plate":""},"92254":{"make":"Utility","year":"2024","serial":"014646","cviExpiry":"","plate":""},"92255":{"make":"Utility","year":"2024","serial":"014647","cviExpiry":"","plate":""},"92446":{"make":"Utility","year":"2024","serial":"032122","cviExpiry":"","plate":""},"92496":{"make":"Utility","year":"2024","serial":"032327","cviExpiry":"","plate":""},"92498":{"make":"Utility","year":"2024","serial":"032329","cviExpiry":"","plate":""},"92499":{"make":"Utility","year":"2024","serial":"032330","cviExpiry":"","plate":""},"92500":{"make":"Utility","year":"2024","serial":"028601","cviExpiry":"","plate":""},"94450":{"make":"Utility","year":"2024","serial":"158714","cviExpiry":"","plate":""},"94460":{"make":"Utility","year":"2024","serial":"158724","cviExpiry":"","plate":""},"94580":{"make":"Felling","year":"2025","serial":"","cviExpiry":"","plate":""},"94746":{"make":"Utility","year":"2024","serial":"187707","cviExpiry":"","plate":""},"94747":{"make":"Utility","year":"2024","serial":"187708","cviExpiry":"","plate":""},"95488":{"make":"Manac","year":"2015","serial":"145593","cviExpiry":"","plate":""},"95490":{"make":"Manac","year":"2015","serial":"145595","cviExpiry":"","plate":""},"95872":{"make":"Renn","year":"2023","serial":"081780","cviExpiry":"","plate":""},"95873":{"make":"Renn","year":"2023","serial":"082079","cviExpiry":"","plate":""},"97369":{"make":"Utility","year":"2026","serial":"638908","cviExpiry":"","plate":""},"97605":{"make":"Utility","year":"2026","serial":"653103","cviExpiry":"","plate":""},"98258":{"make":"Renn","year":"2027","serial":"154700","cviExpiry":"","plate":""},"98259":{"make":"Renn","year":"2027","serial":"154701","cviExpiry":"","plate":""},"98260":{"make":"Renn","year":"2027","serial":"154702","cviExpiry":"","plate":""},"98264":{"make":"Renn","year":"2027","serial":"154706","cviExpiry":"","plate":""},"98265":{"make":"Renn","year":"2027","serial":"154707","cviExpiry":"","plate":""},"98266":{"make":"Renn","year":"2027","serial":"154708","cviExpiry":"","plate":""}};

const DEMO_CUSTOMERS = ["DMZ","Quik's Farms","Shark Group","Load Warrior","Driton Transport","Blacks Logistics","Aurell Freight","Cascade Hauling","Pioneer Carriers","Northline Freight"];
const MAINTENANCE_REASONS = ["Brake inspection","Tire replacement","Light repair","Reefer service","Body repair"];

function todayIso() { return new Date().toISOString().slice(0,10); }
function isoDaysAgo(d) { const x=new Date(); x.setDate(x.getDate()-d); return x.toISOString().slice(0,10); }
function isoDaysFromNow(d) { const x=new Date(); x.setDate(x.getDate()+d); return x.toISOString().slice(0,10); }
function uid(p) { return p+"_"+Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4); }

function emptyUnit(categoryId) {
  return { id:uid("unit"), categoryId, number:"", status:"available", make:"", year:"", serial:"", plate:"", cviExpiry:"", lastPM:"", condition:"Good", reeferHours:"", statusSince:"", trackingUrl:"", location:"", notes:"", rentedTo:"", dateOut:"", expectedReturn:"", history:[], toolbox:"", options:"" };
}

function buildUnitsForMode(categories, mode) {
  const units=[]; let idx=0;
  SEED.forEach((group,i)=>{
    const cat=categories[i];
    const isReefer=/reefer/i.test(group.name);
    group.units.forEach(num=>{
      const u=emptyUnit(cat.id);
      u.number=num; u.location=group.location;
      const info=ENRICHMENT_DATA[num];
      if(info){ u.make=info.make||""; u.year=info.year||""; u.serial=info.serial||""; u.plate=info.plate||""; u.cviExpiry=info.cviExpiry||""; }
      if(mode==="live"){
        u.status=GREEN_UNITS.has(num)?"available":"rented";
        u.statusSince=todayIso();
      } else {
        if(GREEN_UNITS.has(num)){u.status="available";}
        else if(idx%11===0){u.status="maintenance";u.notes=MAINTENANCE_REASONS[idx%MAINTENANCE_REASONS.length];}
        else if(idx%7===0){u.status="reserved";}
        else{u.status="rented";}
        if(u.status==="rented"||u.status==="reserved"){
          u.rentedTo=DEMO_CUSTOMERS[idx%DEMO_CUSTOMERS.length];
          if(u.status==="rented"){u.dateOut=isoDaysAgo(5+((idx*7)%55));u.expectedReturn=idx%12===0?isoDaysAgo(1+(idx%10)):isoDaysFromNow(2+((idx*3)%20));}
          else{u.dateOut=isoDaysFromNow(1+(idx%14));u.expectedReturn=isoDaysFromNow(8+(idx%21));}
        }
        u.statusSince=u.status==="rented"?u.dateOut:isoDaysAgo(1+((idx*11)%60));
        u.cviExpiry=idx%25===0?isoDaysFromNow(-20+(idx%50)):isoDaysFromNow(180+((idx*53)%400));
        u.lastPM=idx%6===0?isoDaysAgo(60+((idx*17)%70)):isoDaysAgo(5+((idx*17)%50));
        u.condition=idx%23===5?"Damaged":idx%9===3?"Fair":"Good";
        if(isReefer)u.reeferHours=idx%8===0?String(4000+((idx*191)%1800)):String(800+((idx*191)%3100));
        const pr=DEMO_CUSTOMERS.filter(c=>c!==u.rentedTo);
        u.history=Array.from({length:2+(idx%3)},(_,h)=>{const len=4+((idx+h*7)%18),back=30+h*(55+(idx%20))+(idx%15);return{pickup:isoDaysAgo(back+len),return:isoDaysAgo(back),renter:pr[(idx+h*3)%pr.length],invoice:"RINV"+(10000+((idx*37+h*211)%89999))};});
      }
      idx++; units.push(u);
    });
  });
  return units;
}

function buildSeedData(mode) {
  const categories=SEED.map((g,i)=>({id:"cat_"+i+"_"+Math.random().toString(36).slice(2,7),name:g.name,color:PALETTE[i%PALETTE.length],yard:g.yard}));
  return {categories,units:buildUnitsForMode(categories,mode)};
}

// --- DB helpers ---
async function dbLoad(mode) {
  const {data,error}=await supabase.from("fleet_board").select("data").eq("key",mode).single();
  if(error||!data)return null;
  return data.data;
}
async function dbSave(mode,payload) {
  await supabase.from("fleet_board").upsert({key:mode,data:payload,updated_at:new Date().toISOString()},{onConflict:"key"});
}

// --- Utility ---
const STATUS_ORDER={available:0,reserved:1,maintenance:2,rented:3};
const CVI_WARNING_DAYS=30, PM_INTERVAL_MONTHS=3, PM_WARNING_DAYS=30, REEFER_SERVICE_HOURS=4000;
const DURATION_LABELS={rented:"On rent",available:"Off rent",reserved:"Reserved",maintenance:"In shop"};
const ALERT_LABELS={cvi:"CVI expiring",pm:"PM due",overdue:"Overdue returns",reefer:"Reefer service due"};

function daysUntil(s){if(!s)return null;const t=new Date();t.setHours(0,0,0,0);const e=new Date(s+"T00:00:00");if(isNaN(e))return null;return Math.round((e-t)/86400000);}
function daysSince(s){const d=daysUntil(s);return d===null?null:-d;}
function addMonths(s,m){const d=new Date(s+"T00:00:00");d.setMonth(d.getMonth()+m);return d.toISOString().slice(0,10);}
function nextPmDate(lpm){return lpm?addMonths(lpm,PM_INTERVAL_MONTHS):null;}
function daysUntilPm(lpm){const due=nextPmDate(lpm);return due?daysUntil(due):null;}
function getYard(cat){return cat.yard||(cat.name.includes("Hatzic")?"Hatzic":"Mission");}
function baseName(n){return n.replace(/\s*[—-]\s*Hatzic\s*$/i,"").trim();}
function compareUnits(a,b){const so=STATUS_ORDER[a.status]-STATUS_ORDER[b.status];if(so!==0)return so;const an=parseInt(a.number,10),bn=parseInt(b.number,10);if(!isNaN(an)&&!isNaN(bn)&&an!==bn)return an-bn;return a.number.localeCompare(b.number,undefined,{numeric:true});}

export default function FleetBoard() {
  const [boardMode,setBoardMode]=useState("live");
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [search,setSearch]=useState("");
  const [activeYard,setActiveYard]=useState("Mission");
  const [viewMode,setViewMode]=useState("rented");
  const [alertFilter,setAlertFilter]=useState(null);
  const [selectedUnitId,setSelectedUnitId]=useState(null);
  const [showAddCategory,setShowAddCategory]=useState(false);
  const [newCategoryName,setNewCategoryName]=useState("");
  const [showToolsMenu,setShowToolsMenu]=useState(false);
  const toolsMenuRef=useRef(null);
  const [pendingDeleteCat,setPendingDeleteCat]=useState(null);
  const [draft,setDraft]=useState(null);
  const [newHistPickup,setNewHistPickup]=useState("");
  const [newHistReturn,setNewHistReturn]=useState("");
  const [newHistRenter,setNewHistRenter]=useState("");
  const [newHistInvoice,setNewHistInvoice]=useState("");
  const saveTimer=useRef(null);
  const [saveState,setSaveState]=useState("idle");

  useEffect(()=>{
    let cancelled=false;
    setLoading(true); setData(null); setSelectedUnitId(null); setDraft(null);
    async function load(){
      try{
        const saved=await dbLoad(boardMode);
        if(cancelled)return;
        if(saved&&Array.isArray(saved.categories)&&Array.isArray(saved.units)){
          saved.units=saved.units.map(u=>({history:[],condition:"Good",reeferHours:"",statusSince:"",trackingUrl:"",plate:"",lastPM:"",toolbox:"",options:"",...u}));
          setData(saved);
        } else {
          const seeded=buildSeedData(boardMode);
          setData(seeded);
          dbSave(boardMode,seeded);
        }
      }catch(e){if(!cancelled)setData(buildSeedData(boardMode));}
      finally{if(!cancelled)setLoading(false);}
    }
    load();
    return()=>{cancelled=true;};
  },[boardMode]);

  useEffect(()=>{
    function h(e){if(toolsMenuRef.current&&!toolsMenuRef.current.contains(e.target))setShowToolsMenu(false);}
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);

  function persist(next){
    setData(next); setSaveState("saving");
    if(saveTimer.current)clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(async()=>{
      try{await dbSave(boardMode,next);setSaveState("saved");setError(null);}
      catch(e){setError("Couldn't save.");setSaveState("idle");}
    },500);
  }

  const yardCategories=useMemo(()=>data?data.categories.filter(c=>getYard(c)===activeYard):[],[data,activeYard]);

  const counts=useMemo(()=>{
    if(!data)return{available:0,rented:0,reserved:0,maintenance:0,cviWarning:0,pmWarning:0,overdue:0,reeferWarning:0};
    const ids=new Set(yardCategories.map(c=>c.id));
    const c={available:0,rented:0,reserved:0,maintenance:0,cviWarning:0,pmWarning:0,overdue:0,reeferWarning:0};
    data.units.forEach(u=>{
      if(!ids.has(u.categoryId))return;
      c[u.status]=(c[u.status]||0)+1;
      const d=daysUntil(u.cviExpiry);if(d!==null&&d<=CVI_WARNING_DAYS)c.cviWarning++;
      const pd=daysUntilPm(u.lastPM);if(pd!==null&&pd<=PM_WARNING_DAYS)c.pmWarning++;
      if(u.status==="rented"){const rd=daysUntil(u.expectedReturn);if(rd!==null&&rd<0)c.overdue++;}
      if(u.reeferHours&&Number(u.reeferHours)>=REEFER_SERVICE_HOURS)c.reeferWarning++;
    });
    return c;
  },[data,yardCategories]);

  const filteredByCategory=useMemo(()=>{
    if(!data)return{};
    const q=search.trim().toLowerCase(),map={};
    yardCategories.forEach(cat=>{map[cat.id]=[];});
    data.units.forEach(u=>{
      if(!map[u.categoryId])return;
      if(alertFilter==="cvi"){const d=daysUntil(u.cviExpiry);if(d===null||d>CVI_WARNING_DAYS)return;}
      else if(alertFilter==="pm"){const d=daysUntilPm(u.lastPM);if(d===null||d>PM_WARNING_DAYS)return;}
      else if(alertFilter==="overdue"){if(u.status!=="rented")return;const d=daysUntil(u.expectedReturn);if(d===null||d>=0)return;}
      else if(alertFilter==="reefer"){if(!u.reeferHours||Number(u.reeferHours)<REEFER_SERVICE_HOURS)return;}
      else{
        if(viewMode==="rented"&&u.status!=="rented")return;
        if(viewMode==="available"&&u.status!=="available")return;
        if(viewMode==="reserved"&&u.status!=="reserved")return;
        if(viewMode==="maintenance"&&u.status!=="maintenance")return;
      }
      if(q){const hay=[u.number,u.make,u.serial,u.rentedTo,u.notes,u.location].join(" ").toLowerCase();if(!hay.includes(q))return;}
      map[u.categoryId].push(u);
    });
    Object.keys(map).forEach(id=>map[id].sort(compareUnits));
    return map;
  },[data,search,yardCategories,viewMode,alertFilter]);

  function exportCsv(){
    const rows=[["Unit","Category","Status","Make","Year","Serial","Plate","CVI Expiry","Last PM","Condition","Reefer Hours","Rented To","Date Out","Expected Return","Location"]];
    yardCategories.forEach(cat=>(filteredByCategory[cat.id]||[]).forEach(u=>rows.push([u.number,cat.name,STATUS[u.status].label,u.make,u.year,u.serial,u.plate,u.cviExpiry,u.lastPM,u.condition,u.reeferHours,u.rentedTo,u.dateOut,u.expectedReturn,u.location])));
    const csv=rows.map(r=>r.map(c=>`"${String(c||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=`${activeYard}-${boardMode}-${todayIso()}.csv`;a.click();
  }

  function addUnit(catId){const u=emptyUnit(catId);const next={...data,units:[...data.units,u]};persist(next);openUnit(u.id,next);}

  function openUnit(id,src){
    const s=src||data,u=s.units.find(x=>x.id===id);
    if(!u)return;
    const cat=s.categories.find(c=>c.id===u.categoryId);
    setDraft({...u,location:YARDS.includes(u.location)?u.location:(cat?getYard(cat):YARDS[0])});
    setSelectedUnitId(id);setNewHistPickup("");setNewHistReturn("");setNewHistRenter("");setNewHistInvoice("");
  }

  function saveDraft(){
    if(!draft)return;
    let cats=data.categories,catId=draft.categoryId;
    const cur=cats.find(c=>c.id===catId);
    const tY=YARDS.includes(draft.location)?draft.location:(cur?getYard(cur):YARDS[0]);
    if(cur&&getYard(cur)!==tY){
      const wn=baseName(cur.name);
      let t=cats.find(c=>getYard(c)===tY&&baseName(c.name)===wn);
      if(!t){t={id:uid("cat"),name:wn,color:cur.color,yard:tY};cats=[...cats,t];}
      catId=t.id;
    }
    const orig=data.units.find(u=>u.id===draft.id);
    const sc=orig&&orig.status!==draft.status;
    const saved={...draft,categoryId:catId,statusSince:sc?todayIso():(draft.statusSince||todayIso())};
    persist({categories:cats,units:data.units.map(u=>u.id===draft.id?saved:u)});
    setSelectedUnitId(null);setDraft(null);
  }

  function deleteUnit(id){persist({...data,units:data.units.filter(u=>u.id!==id)});setSelectedUnitId(null);setDraft(null);}

  function addHistoryNote(){
    if(!newHistRenter.trim()||!draft)return;
    const entry={pickup:newHistPickup||"",return:newHistReturn||"",renter:newHistRenter.trim(),invoice:newHistInvoice.trim()};
    const sk=e=>e.pickup||e.return||"";
    setDraft({...draft,history:[...(draft.history||[]),entry].sort((a,b)=>sk(a)<sk(b)?1:sk(a)>sk(b)?-1:0)});
    setNewHistPickup("");setNewHistReturn("");setNewHistRenter("");setNewHistInvoice("");
  }

  function addCategory(){
    if(!newCategoryName.trim())return;
    const cat={id:uid("cat"),name:newCategoryName.trim(),color:PALETTE[data.categories.length%PALETTE.length],yard:activeYard};
    persist({...data,categories:[...data.categories,cat]});
    setNewCategoryName("");setShowAddCategory(false);
  }

  function deleteCategory(catId){
    if(data.units.some(u=>u.categoryId===catId)){setPendingDeleteCat(catId);return;}
    persist({categories:data.categories.filter(c=>c.id!==catId),units:data.units.filter(u=>u.categoryId!==catId)});
  }

  function confirmDeleteCategory(){
    const id=pendingDeleteCat;
    persist({categories:data.categories.filter(c=>c.id!==id),units:data.units.filter(u=>u.categoryId!==id)});
    setPendingDeleteCat(null);
  }

  if(loading)return<div style={{fontFamily:"'IBM Plex Sans',sans-serif",padding:40,color:"#5a6472"}}>Loading…</div>;
  const selCat=draft?data.categories.find(c=>c.id===draft.categoryId):null;

  return(
    <div className="fb-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        .fb-root{font-family:'IBM Plex Sans',sans-serif;background:#ece8df;min-height:100vh;color:#1c2128;}
        .fb-topbar{background:#0b2e33;padding:14px 20px;position:sticky;top:0;z-index:20;}
        .fb-rivetbar{height:6px;background:repeating-linear-gradient(90deg,#1f5b62 0 4px,transparent 4px 18px);opacity:.5;margin-bottom:10px;border-radius:3px;}
        .fb-topbar-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
        .fb-brand{display:flex;align-items:center;gap:12px;white-space:nowrap;}
        .fb-logo{height:32px;background:#fff;padding:5px 10px;border-radius:6px;}
        .fb-brand-sub{font-family:'IBM Plex Mono',monospace;font-size:12.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#7fb3b3;border-left:1px solid #1f5b62;padding-left:12px;}
        .fb-brand-sub b{color:#eaf6f5;}
        .fb-modetabs{display:flex;gap:3px;background:#072024;padding:3px;border-radius:7px;}
        .fb-modetab{font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:700;padding:7px 14px;border-radius:5px;border:none;background:transparent;color:#7fb3b3;cursor:pointer;}
        .fb-modetab.live.active{background:#1fb8ae;color:#04282b;}
        .fb-modetab.demo.active{background:#c8941f;color:#2a1d00;}
        .fb-demobadge{background:#c8941f;color:#fff;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:700;padding:4px 10px;border-radius:5px;}
        .fb-yardtabs{display:flex;gap:4px;background:#072024;padding:3px;border-radius:7px;}
        .fb-yardtab{font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:700;padding:7px 14px;border-radius:5px;border:none;background:transparent;color:#7fb3b3;cursor:pointer;}
        .fb-yardtab.active{background:#1fb8ae;color:#04282b;}
        .fb-viewtoggle{display:flex;gap:4px;background:#072024;padding:3px;border-radius:7px;}
        .fb-viewtoggle button{font-family:'IBM Plex Sans',sans-serif;font-size:12px;font-weight:600;padding:7px 12px;border-radius:5px;border:none;background:transparent;color:#7fb3b3;cursor:pointer;}
        .fb-viewtoggle button.active{background:#1f5b62;color:#eaf6f5;}
        .fb-search{flex:1;min-width:160px;background:#123b41;border:1px solid #1f5b62;border-radius:6px;padding:8px 12px;color:#eaf6f5;font-size:14px;}
        .fb-search::placeholder{color:#6fa3a3;}
        .fb-chip{font-family:'IBM Plex Mono',monospace;font-size:12px;padding:6px 10px;border-radius:5px;font-weight:600;white-space:nowrap;border:none;}
        button.fb-chip{cursor:pointer;opacity:.88;}
        button.fb-chip:hover{opacity:1;}
        button.fb-chip.active{opacity:1;outline:2px solid #fff;outline-offset:-2px;}
        .fb-chip-warn{background:#ff5a3c;color:#fff;}
        .fb-chip-pm{background:#7c5cff;color:#fff;}
        .fb-chip-overdue{background:#e0392b;color:#fff;}
        .fb-chip-reefer{background:#1f8fc8;color:#fff;}
        .fb-btn{font-family:'IBM Plex Sans',sans-serif;font-size:13px;font-weight:600;padding:8px 14px;border-radius:6px;border:1px solid #1f5b62;background:#123b41;color:#eaf6f5;cursor:pointer;white-space:nowrap;}
        .fb-btn:hover{background:#184a51;}
        .fb-btn.primary{background:#1fb8ae;color:#04282b;border-color:#1fb8ae;}
        .fb-btn.primary:hover{background:#4dd9cf;}
        .fb-btn.danger{background:#c83f3f;color:#fff;border-color:#c83f3f;}
        .fb-savestate{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6fa3a3;white-space:nowrap;}
        .fb-toolsmenu{position:relative;}
        .fb-toolsdropdown{position:absolute;top:calc(100% + 6px);left:0;background:#0e3036;border:1px solid #1f5b62;border-radius:8px;padding:5px;display:flex;flex-direction:column;min-width:140px;z-index:30;box-shadow:0 6px 18px rgba(0,0,0,.35);}
        .fb-toolsdropdown button{background:none;border:none;text-align:left;padding:9px 10px;border-radius:5px;color:#eaf6f5;font-size:13px;font-weight:600;cursor:pointer;}
        .fb-toolsdropdown button:hover{background:#1f5b62;}
        .fb-error{background:#c83f3f;color:#fff;padding:8px 20px;font-size:13px;}
        .fb-alertbanner{margin:14px 14px 0;padding:10px 14px;background:#fdeeea;border:1px solid #f3c4b8;border-radius:7px;font-size:12.5px;color:#7a3322;line-height:1.5;}
        .fb-link{background:none;border:none;color:#0e7c86;font-weight:700;text-decoration:underline;cursor:pointer;font-size:12.5px;padding:0;}
        .fb-board{column-count:3;column-gap:10px;padding:14px;}
        @media(max-width:760px){.fb-board{column-count:2;}}
        @media(max-width:460px){.fb-board{column-count:1;}}
        .fb-col{background:#f7f5ee;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.08);display:flex;flex-direction:column;max-height:46vh;break-inside:avoid;-webkit-column-break-inside:avoid;margin-bottom:10px;}
        .fb-col-tag{border-radius:8px 8px 0 0;padding:7px 9px;font-weight:700;font-size:12px;display:flex;align-items:center;gap:5px;}
        .fb-col-tag input{background:transparent;border:none;font-weight:700;font-size:12px;font-family:'IBM Plex Sans',sans-serif;width:100%;color:inherit;}
        .fb-col-tag input:focus{outline:none;border-bottom:1px solid rgba(0,0,0,.3);}
        .fb-col-count{font-family:'IBM Plex Mono',monospace;font-size:11px;opacity:.65;flex-shrink:0;}
        .fb-col-add{background:rgba(255,255,255,.55);border:none;border-radius:4px;cursor:pointer;width:17px;height:17px;line-height:15px;text-align:center;padding:0;font-size:13px;font-weight:700;flex-shrink:0;opacity:.8;}
        .fb-col-add:hover{opacity:1;background:rgba(255,255,255,.85);}
        .fb-col-del{background:none;border:none;cursor:pointer;opacity:.45;font-size:13px;flex-shrink:0;}
        .fb-col-del:hover{opacity:1;}
        .fb-col-list{overflow-y:auto;padding:6px;flex:1;}
        .fb-unit{background:#fff;border:1px solid #e4e0d4;border-radius:5px;padding:4px 7px;margin-bottom:4px;cursor:pointer;display:flex;align-items:center;gap:6px;}
        .fb-unit:hover{border-color:#c8c2af;background:#fffdf8;}
        .fb-unit-main{flex:1;min-width:0;}
        .fb-unit-dur{flex-shrink:0;text-align:right;padding-left:6px;}
        .fb-unit-dur-n{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;color:#7a7466;}
        .fb-unit-dur-l{font-size:10px;color:#7a7466;}
        .fb-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
        .fb-unit-num{font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:13px;}
        .fb-unit-my{font-weight:500;color:#8a8470;font-size:11.5px;}
        .fb-unit-sub{font-size:10px;color:#7a7466;line-height:1.3;}
        .fb-badge{display:inline-block;margin-top:3px;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;}
        .fb-badge-cvi{color:#c0331c;background:#ffe4dc;}
        .fb-badge-pm{color:#5a3fc0;background:#ece6ff;margin-left:4px;}
        .fb-badge-overdue{color:#fff;background:#e0392b;display:block;width:fit-content;}
        .fb-badge-reefer{color:#0c5a82;background:#dcf0fb;margin-left:4px;}
        .fb-unit-track{display:inline-block;margin-top:2px;font-size:10px;font-weight:700;color:#0e7c86;text-decoration:none;}
        .fb-addcol{break-inside:avoid;margin-bottom:10px;}
        .fb-addcol button{width:100%;min-height:60px;background:#ddd8c8;border:1px dashed #aba593;border-radius:8px;padding:14px;color:#5a5648;font-weight:600;font-size:13px;cursor:pointer;}
        .fb-empty{column-span:all;text-align:center;padding:60px 20px;color:#8a8470;font-size:14px;}
        .fb-hiddennote{margin:0 14px 16px;padding:10px 14px;background:#efe9d8;border:1px solid #ddd4ba;border-radius:7px;font-size:12.5px;color:#6e6650;line-height:1.5;}
        .fb-overlay{position:fixed;inset:0;background:rgba(20,20,16,.45);display:flex;justify-content:flex-end;z-index:50;}
        .fb-overlay.center{justify-content:center;align-items:center;}
        .fb-drawer{background:#f7f5ee;width:380px;max-width:92vw;height:100%;overflow-y:auto;padding:14px 16px;box-shadow:-4px 0 18px rgba(0,0,0,.2);}
        .fb-modal{background:#f7f5ee;width:460px;max-width:92vw;border-radius:10px;padding:22px;max-height:86vh;overflow-y:auto;}
        .fb-drawer-tag{display:inline-block;padding:3px 8px;border-radius:5px;font-size:10.5px;font-weight:700;margin-bottom:6px;}
        .fb-drawer h2{font-family:'IBM Plex Mono',monospace;font-size:19px;margin:0 0 8px 0;}
        .fb-field{margin-bottom:8px;}
        .fb-field label{display:block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:#7a7466;margin-bottom:2px;}
        .fb-field input,.fb-field textarea,.fb-field select{width:100%;padding:6px 9px;border:1px solid #d8d2c2;border-radius:6px;font-family:'IBM Plex Sans',sans-serif;font-size:13px;background:#fff;}
        .fb-row2{display:flex;gap:8px;}
        .fb-row2>div{flex:1;}
        .fb-trackrow{display:flex;gap:6px;}
        .fb-trackrow input{flex:1;}
        .fb-hint{font-size:12px;color:#7a7466;margin-bottom:10px;line-height:1.5;}
        .fb-cvi-hint{font-size:10.5px;color:#7a7466;margin-top:2px;}
        .fb-cvi-hint.warn{color:#c0331c;font-weight:700;}
        .fb-status-toggle{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:8px;}
        .fb-status-toggle button{padding:6px;border-radius:6px;border:1.5px solid #d8d2c2;background:#fff;font-size:11.5px;font-weight:700;cursor:pointer;}
        .fb-status-toggle button.active{border-color:transparent;color:#fff;}
        .fb-drawer-actions{display:flex;gap:8px;margin-top:10px;}
        .fb-history{margin-top:12px;border-top:1px solid #ddd8c8;padding-top:10px;}
        .fb-history h4{font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#7a7466;margin:0 0 8px 0;}
        .fb-history-add{display:flex;flex-direction:column;gap:6px;margin-bottom:14px;padding:10px;background:#fff;border:1px solid #e4e0d4;border-radius:7px;}
        .fb-history-row{display:flex;gap:6px;align-items:center;}
        .fb-history-row input{flex:1;min-width:0;}
        .fb-harrow{color:#9a9486;flex-shrink:0;font-size:12px;}
        .fb-history-entry{font-size:12.5px;padding:8px 0;border-bottom:1px solid #eee9da;}
        .fb-history-dates{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#4a4636;font-weight:600;}
        .fb-history-meta{margin-top:2px;color:#7a7466;display:flex;align-items:center;gap:8px;}
        .fb-inv-tag{font-family:'IBM Plex Mono',monospace;font-size:10.5px;font-weight:700;color:#0e7c86;background:#e3f2f1;padding:1px 6px;border-radius:4px;}
        .fb-close{background:none;border:none;font-size:20px;cursor:pointer;color:#7a7466;float:right;}
        .fb-modal h3{font-family:'IBM Plex Mono',monospace;margin-top:0;}
        @media print{.no-print{display:none!important;}}
      `}</style>

      <div className="fb-topbar">
        <div className="fb-rivetbar"/>
        <div className="fb-topbar-row">
          <div className="fb-brand">
            <img src={LOGO_SRC} alt="Ocean Trailer" className="fb-logo"/>
            <span className="fb-brand-sub">Rental <b>Board</b></span>
          </div>
          <div className="fb-modetabs no-print">
            <button className={`fb-modetab live${boardMode==="live"?" active":""}`} onClick={()=>setBoardMode("live")}>Live</button>
            <button className={`fb-modetab demo${boardMode==="demo"?" active":""}`} onClick={()=>setBoardMode("demo")}>Demo</button>
          </div>
          {boardMode==="demo"&&<span className="fb-demobadge no-print">DEMO DATA</span>}
          <div className="fb-yardtabs no-print">
            {YARDS.map(y=><button key={y} className={`fb-yardtab${activeYard===y?" active":""}`} onClick={()=>setActiveYard(y)}>{y}</button>)}
          </div>
          <div className="fb-viewtoggle no-print">
            {[["rented","On rent"],["reserved","Reserved"],["available","Available"],["all","All units"]].map(([v,l])=>(
              <button key={v} className={!alertFilter&&viewMode===v?"active":""} onClick={()=>{setViewMode(v);setAlertFilter(null);}}>{l}</button>
            ))}
          </div>
          <input className="fb-search no-print" placeholder="Search unit #, make, customer…" value={search} onChange={e=>setSearch(e.target.value)}/>
          {[["available","Available"],["rented","Out"],["reserved","Reserved"]].map(([k,l])=>(
            <div key={k} className="fb-chip" style={{background:STATUS[k].bg,color:STATUS[k].color}}>{counts[k]} {l}</div>
          ))}
          <button className={`fb-chip${!alertFilter&&viewMode==="maintenance"?" active":""}`} style={{background:STATUS.maintenance.bg,color:STATUS.maintenance.color}} onClick={()=>{setAlertFilter(null);setViewMode(viewMode==="maintenance"&&!alertFilter?"all":"maintenance");}}>
            {counts.maintenance} Maint.
          </button>
          {counts.cviWarning>0&&<button className={`fb-chip fb-chip-warn${alertFilter==="cvi"?" active":""}`} onClick={()=>setAlertFilter(alertFilter==="cvi"?null:"cvi")}>⚠ {counts.cviWarning} CVI</button>}
          {counts.pmWarning>0&&<button className={`fb-chip fb-chip-pm${alertFilter==="pm"?" active":""}`} onClick={()=>setAlertFilter(alertFilter==="pm"?null:"pm")}>🔧 {counts.pmWarning} PM</button>}
          {counts.overdue>0&&<button className={`fb-chip fb-chip-overdue${alertFilter==="overdue"?" active":""}`} onClick={()=>setAlertFilter(alertFilter==="overdue"?null:"overdue")}>⏰ {counts.overdue} Overdue</button>}
          {counts.reeferWarning>0&&<button className={`fb-chip fb-chip-reefer${alertFilter==="reefer"?" active":""}`} onClick={()=>setAlertFilter(alertFilter==="reefer"?null:"reefer")}>❄ {counts.reeferWarning} Reefer</button>}
          <div className="fb-toolsmenu no-print" ref={toolsMenuRef}>
            <button className="fb-btn" onClick={()=>setShowToolsMenu(v=>!v)}>Tools ▾</button>
            {showToolsMenu&&(
              <div className="fb-toolsdropdown">
                <button onClick={()=>{exportCsv();setShowToolsMenu(false);}}>Export CSV</button>
                <button onClick={()=>{setShowToolsMenu(false);window.print();}}>Print</button>
              </div>
            )}
          </div>
          <button className="fb-btn primary no-print" onClick={()=>setShowAddCategory(true)}>+ Column</button>
          <div className="fb-savestate no-print">{saveState==="saving"?"saving…":saveState==="saved"?"saved ✓":""}</div>
        </div>
      </div>

      {error&&<div className="fb-error">{error}</div>}
      {alertFilter&&(
        <div className="fb-alertbanner">
          Showing units flagged for <strong>{ALERT_LABELS[alertFilter]}</strong>.{" "}
          <button className="fb-link" onClick={()=>setAlertFilter(null)}>Clear</button>
        </div>
      )}

      <div className="fb-board">
        {yardCategories
          .filter(cat=>(!alertFilter&&viewMode==="all")||(filteredByCategory[cat.id]||[]).length>0)
          .map(cat=>{
            const units=filteredByCategory[cat.id]||[];
            return(
              <div className="fb-col" key={cat.id}>
                <div className="fb-col-tag" style={{background:cat.color}}>
                  <input value={cat.name} onChange={e=>{ const cats=data.categories.map(c=>c.id===cat.id?{...c,name:e.target.value}:c); persist({...data,categories:cats}); }}/>
                  <span className="fb-col-count">{units.length}</span>
                  <button className="fb-col-add" onClick={()=>addUnit(cat.id)}>+</button>
                  <button className="fb-col-del" onClick={()=>deleteCategory(cat.id)}>✕</button>
                </div>
                <div className="fb-col-list">
                  {units.map(u=>{
                    const cviD=daysUntil(u.cviExpiry),cviW=cviD!==null&&cviD<=CVI_WARNING_DAYS;
                    const pmD=daysUntilPm(u.lastPM),pmW=pmD!==null&&pmD<=PM_WARNING_DAYS;
                    const retD=u.status==="rented"?daysUntil(u.expectedReturn):null,overW=retD!==null&&retD<0;
                    const reefW=u.reeferHours&&Number(u.reeferHours)>=REEFER_SERVICE_HOURS;
                    const dur=daysSince(u.statusSince);
                    return(
                      <div className="fb-unit" key={u.id} onClick={()=>openUnit(u.id)}>
                        <span className="fb-dot" style={{background:STATUS[u.status].color}}/>
                        <div className="fb-unit-main">
                          <div className="fb-unit-num">
                            {u.number||"—"}
                            {(u.year||u.make)&&<span className="fb-unit-my"> — {[u.year,u.make].filter(Boolean).join(" ")}</span>}
                          </div>
                          <div className="fb-unit-sub">
                            {STATUS[u.status].label}
                            {(u.status==="rented"||u.status==="reserved")&&u.rentedTo?` ${u.status==="reserved"?"for":"to"} ${u.rentedTo}`:""}
                            {u.status==="maintenance"&&u.notes?` — ${u.notes}`:""}
                          </div>
                          {overW&&<div className="fb-badge fb-badge-overdue">⏰ Overdue {Math.abs(retD)}d ({u.expectedReturn})</div>}
                          {cviW&&<span className="fb-badge fb-badge-cvi">⚠ CVI {cviD<0?"expired":`${cviD}d`}</span>}
                          {pmW&&<span className="fb-badge fb-badge-pm">🔧 PM {pmD<0?"overdue":`${pmD}d`}</span>}
                          {reefW&&<span className="fb-badge fb-badge-reefer">❄ {u.reeferHours}h</span>}
                          {u.trackingUrl&&<a className="fb-unit-track" href={u.trackingUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}>📍 Track ↗</a>}
                        </div>
                        {dur!==null&&dur>=0&&(
                          <div className="fb-unit-dur">
                            <div className="fb-unit-dur-n">{dur}d</div>
                            <div className="fb-unit-dur-l">{DURATION_LABELS[u.status]||""}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        {!alertFilter&&viewMode==="all"&&<div className="fb-addcol"><button onClick={()=>setShowAddCategory(true)}>+ New column</button></div>}
        {(alertFilter||viewMode!=="all")&&yardCategories.every(c=>(filteredByCategory[c.id]||[]).length===0)&&(
          <div className="fb-empty">Nothing to show for this filter at {activeYard}.</div>
        )}
      </div>

      {(alertFilter||viewMode!=="all")&&(()=>{
        const hidden=yardCategories.filter(c=>(filteredByCategory[c.id]||[]).length===0);
        if(!hidden.length)return null;
        return(
          <div className="fb-hiddennote">
            <strong>{hidden.length} column{hidden.length!==1?"s":""} hidden</strong>: {hidden.map(c=>c.name).join(", ")}.{" "}
            <button className="fb-link" onClick={()=>{setAlertFilter(null);setViewMode("all");}}>Show all</button>
          </div>
        );
      })()}

      {selectedUnitId&&draft&&(
        <div className="fb-overlay" onClick={()=>{setSelectedUnitId(null);setDraft(null);}}>
          <div className="fb-drawer" onClick={e=>e.stopPropagation()}>
            <button className="fb-close" onClick={()=>{setSelectedUnitId(null);setDraft(null);}}>✕</button>
            <div className="fb-drawer-tag" style={{background:selCat?.color}}>{selCat?.name}</div>
            <h2>{draft.number||"New unit"}</h2>
            <div className="fb-status-toggle">
              {Object.entries(STATUS).map(([k,s])=>(
                <button key={k} className={draft.status===k?"active":""} style={draft.status===k?{background:s.color}:{}} onClick={()=>setDraft({...draft,status:k})}>{s.label}</button>
              ))}
            </div>
            {draft.statusSince&&daysSince(draft.statusSince)!==null&&(
              <div className="fb-hint" style={{marginTop:-2,marginBottom:10}}>{DURATION_LABELS[draft.status]||"In status"} for <strong>{daysSince(draft.statusSince)}d</strong> (since {draft.statusSince})</div>
            )}
            <div className="fb-field"><label>Unit number</label><input value={draft.number} onChange={e=>setDraft({...draft,number:e.target.value})}/></div>
            <div className="fb-row2">
              <div className="fb-field"><label>Make</label><input value={draft.make} onChange={e=>setDraft({...draft,make:e.target.value})}/></div>
              <div className="fb-field"><label>Year</label><input value={draft.year} onChange={e=>setDraft({...draft,year:e.target.value})}/></div>
            </div>
            <div className="fb-field"><label>Serial / VIN</label><input value={draft.serial} onChange={e=>setDraft({...draft,serial:e.target.value})}/></div>
            <div className="fb-row2">
              <div className="fb-field"><label>Plate</label><input value={draft.plate||""} onChange={e=>setDraft({...draft,plate:e.target.value})}/></div>
              <div className="fb-field">
                <label>CVI expiry</label>
                <input type="date" value={draft.cviExpiry||""} onChange={e=>setDraft({...draft,cviExpiry:e.target.value})}/>
                {(()=>{const d=daysUntil(draft.cviExpiry);if(d===null)return null;return<div className={`fb-cvi-hint${d<=CVI_WARNING_DAYS?" warn":""}`}>{d<0?`Expired ${Math.abs(d)}d ago`:`${d}d remaining`}</div>;})()}
              </div>
            </div>
            <div className="fb-row2">
              <div className="fb-field">
                <label>Last PM</label>
                <input type="date" value={draft.lastPM||""} onChange={e=>setDraft({...draft,lastPM:e.target.value})}/>
                {draft.lastPM&&(()=>{const d=daysUntilPm(draft.lastPM);return<div className={`fb-cvi-hint${d<=PM_WARNING_DAYS?" warn":""}`}>Due {nextPmDate(draft.lastPM)} ({d<0?`${Math.abs(d)}d overdue`:`${d}d`})</div>;})()}
              </div>
              <div className="fb-field"><label>Condition</label><select value={draft.condition||"Good"} onChange={e=>setDraft({...draft,condition:e.target.value})}><option>Good</option><option>Fair</option><option>Damaged</option></select></div>
            </div>
            <div className="fb-row2">
              <div className="fb-field">
                <label>Reefer hours</label>
                <input value={draft.reeferHours||""} onChange={e=>setDraft({...draft,reeferHours:e.target.value})} placeholder="e.g. 3200"/>
                {draft.reeferHours&&Number(draft.reeferHours)>=REEFER_SERVICE_HOURS&&<div className="fb-cvi-hint warn">Service due</div>}
              </div>
              <div className="fb-field"><label>Yard</label><select value={draft.location||YARDS[0]} onChange={e=>setDraft({...draft,location:e.target.value})}>{YARDS.map(y=><option key={y}>{y}</option>)}</select></div>
            </div>
            <div className="fb-row2">
              <div className="fb-field"><label>Toolbox</label><input value={draft.toolbox||""} onChange={e=>setDraft({...draft,toolbox:e.target.value})}/></div>
              <div className="fb-field"><label>Options</label><input value={draft.options||""} onChange={e=>setDraft({...draft,options:e.target.value})}/></div>
            </div>
            <div className="fb-field">
              <label>Phillips Connect link</label>
              <div className="fb-trackrow">
                <input value={draft.trackingUrl||""} onChange={e=>setDraft({...draft,trackingUrl:e.target.value})} placeholder="Paste link"/>
                {draft.trackingUrl&&<a className="fb-btn" href={draft.trackingUrl} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",textDecoration:"none"}}>Open ↗</a>}
              </div>
            </div>
            {(draft.status==="rented"||draft.status==="reserved")&&(
              <>
                <div className="fb-field"><label>{draft.status==="reserved"?"Reserved for":"Rented to"}</label><input value={draft.rentedTo} onChange={e=>setDraft({...draft,rentedTo:e.target.value})}/></div>
                <div className="fb-row2">
                  <div className="fb-field"><label>{draft.status==="reserved"?"Due out":"Date out"}</label><input type="date" value={draft.dateOut} onChange={e=>setDraft({...draft,dateOut:e.target.value})}/></div>
                  <div className="fb-field"><label>Expected return</label><input type="date" value={draft.expectedReturn} onChange={e=>setDraft({...draft,expectedReturn:e.target.value})}/></div>
                </div>
              </>
            )}
            <div className="fb-field"><label>Notes</label><textarea rows={3} value={draft.notes} onChange={e=>setDraft({...draft,notes:e.target.value})}/></div>
            <div className="fb-drawer-actions">
              <button className="fb-btn primary" onClick={saveDraft}>Save changes</button>
              <button className="fb-btn danger" onClick={()=>deleteUnit(draft.id)}>Delete unit</button>
            </div>
            <div className="fb-history">
              <h4>Rental history</h4>
              <div className="fb-history-add">
                <div className="fb-history-row">
                  <input type="date" value={newHistPickup} onChange={e=>setNewHistPickup(e.target.value)}/>
                  <span className="fb-harrow">→</span>
                  <input type="date" value={newHistReturn} onChange={e=>setNewHistReturn(e.target.value)}/>
                </div>
                <div className="fb-history-row">
                  <input placeholder="Renter" value={newHistRenter} onChange={e=>setNewHistRenter(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addHistoryNote()}/>
                  <input placeholder="Invoice #" value={newHistInvoice} onChange={e=>setNewHistInvoice(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addHistoryNote()} style={{fontFamily:"'IBM Plex Mono',monospace"}}/>
                </div>
                <button className="fb-btn" onClick={addHistoryNote}>Add</button>
              </div>
              {!(draft.history||[]).length&&<div className="fb-hint">No history yet.</div>}
              {(draft.history||[]).map((h,i)=>(
                <div className="fb-history-entry" key={i}>
                  <div className="fb-history-dates">{h.pickup||"—"} <span className="fb-harrow">→</span> {h.return||"—"}</div>
                  <div className="fb-history-meta">{h.renter}{h.invoice&&<span className="fb-inv-tag">{h.invoice}</span>}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAddCategory&&(
        <div className="fb-overlay center" onClick={()=>setShowAddCategory(false)}>
          <div className="fb-modal" onClick={e=>e.stopPropagation()}>
            <button className="fb-close" onClick={()=>setShowAddCategory(false)}>✕</button>
            <h3>New column — {activeYard}</h3>
            <div className="fb-field">
              <label>Column name</label>
              <input value={newCategoryName} onChange={e=>setNewCategoryName(e.target.value)} placeholder="e.g. 53' Tri Reefer" onKeyDown={e=>e.key==="Enter"&&addCategory()} autoFocus/>
            </div>
            <button className="fb-btn primary" onClick={addCategory}>Add column</button>
          </div>
        </div>
      )}

      {pendingDeleteCat&&(
        <div className="fb-overlay center" onClick={()=>setPendingDeleteCat(null)}>
          <div className="fb-modal" onClick={e=>e.stopPropagation()}>
            <button className="fb-close" onClick={()=>setPendingDeleteCat(null)}>✕</button>
            <h3>Delete column?</h3>
            <div className="fb-hint">This column still has units. Deleting it removes them all.</div>
            <div className="fb-drawer-actions">
              <button className="fb-btn danger" onClick={confirmDeleteCategory}>Yes, delete</button>
              <button className="fb-btn" onClick={()=>setPendingDeleteCat(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
