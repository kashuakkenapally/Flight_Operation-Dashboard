package com.flightops.model;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightDTO {
    private Long id;
    private String flightNumber;
    private String origin;
    private String destination;
    private LocalDateTime scheduledDeparture;
    private LocalDateTime scheduledArrival;
    private LocalDateTime actualDeparture;
    private LocalDateTime actualArrival;
    private Flight.FlightStatus status;
    private String aircraftType;
    private Integer delayMinutes;
    private String delayReason;
    private String gate;
}
