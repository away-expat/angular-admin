import { TestBed } from '@angular/core/testing';

import { ApiNeo4jService } from './api-neo4j.service';

describe('ApiNeo4jService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiNeo4jService = TestBed.get(ApiNeo4jService);
    expect(service).toBeTruthy();
  });
});
