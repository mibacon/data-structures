Project FEED ME
===============

### Data Model Schema and SQL Code
### Week 8 Assignment
---------------------

### Model
I have been assigned both FSR and temperature sensors. My project will measure how temperature affects my plant's consumption of water. 
Also explored will be how long it takes my plants to finish their water, and at what rate. 
I will place the FSR sensor underneath the watertank (they're hydroponic) to measure how much water is left in the tank (a full tank will have a higher FSR score, while an empty tank a smaller FSR score).
This is a continuous data model, i.e. I will check both FSR and temperature measures at regular intervals (every 5 min) and take a time-stamped snap shot of the data.

The SQL table is pretty straightforward. For example:

   temp | fsr  |          datatime          
 ------+------+----------------------------  
  20.2 | 3000 | 2017-10-22 20:00:09.298532  
 
 
### SQL CODE
CREATE TABLE sensorData (temp REAL,fsr int, dataTime timestamp DEFAULT current_timestamp);

\d
           List of relations
           
   Schema |    Name    | Type  |  Owner  
 --------+------------+-------+---------  
 public | sensordata | table | mibacon  
 
 INSERT INTO sensorData VALUES (20.2, 3000, default);
 
 ### Draft Visualization
 ![Image of Vis](https://mibacon.github.io/data-structures/week8/WIN_20171022_16_42_39_Pro.jpg)