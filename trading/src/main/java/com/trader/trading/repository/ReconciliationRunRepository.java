package com.trader.trading.repository;

import com.trader.trading.model.*;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReconciliationRunRepository extends JpaRepository<ReconciliationRun, Long> {
}
